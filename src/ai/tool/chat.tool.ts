import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ChatTool {
  private chatModel: ChatOpenAI;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.chatModel = new ChatOpenAI({
      openAIApiKey: this.configService.get('OPENAI_API_KEY'),
      configuration: {
        baseURL: this.configService.get('GLM_BASE_URL'),
      },
      modelName: this.configService.get('GLM_MODEL') || 'gpt-3.5-turbo',
      temperature: 0.7,
    });
  }

  async chat(userMessage: string) {
    const drinks = await this.prisma.drinks.findMany();

    const drinksContext = drinks
      .map(
        (drink) =>
          `- ${drink.name}: ${drink.description || 'No description'} (Tag: ${drink.recommendation_tag || 'N/A'}, Price: ${drink.price || 'N/A'})`,
      )
      .join('\n');

    const systemPrompt = `You are a helpful drink recommendation assistant. Based on the user's preferences, mood, or context, recommend drinks from our menu.

Available drinks:
${drinksContext}

When recommending:
1. Consider the user's mood, preferences, or context
2. Suggest 2-3 suitable drinks from our menu
3. Explain why each drink would be a good choice
4. Be conversational and friendly
5. Only recommend drinks from the menu above

If the user's request is not about drinks, politely redirect them to ask about drink recommendations.`;

    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(userMessage),
    ];

    const response = await this.chatModel.invoke(messages);

    return {
      message: response.content as string,
      drinks: this.extractRecommendedDrinks(response.content as string, drinks),
    };
  }

  private extractRecommendedDrinks(aiResponse: string, allDrinks: any[]) {
    const recommendedDrinks = allDrinks.filter((drink) =>
      aiResponse.toLowerCase().includes(drink.name.toLowerCase()),
    );

    return recommendedDrinks.map((drink) => ({
      id: drink.id,
      name: drink.name,
      description: drink.description,
      price: drink.price,
      imageUrl: drink.image_url,
      recommendationTag: drink.recommendation_tag,
    }));
  }
}
