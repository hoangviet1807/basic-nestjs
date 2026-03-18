import { Injectable } from '@nestjs/common';
import { WeatherTool } from './tool/getWeather.tool';
import { DrinkRecommendationTool } from './tool/getRecommendationCode.tool';
import { ChatTool } from './tool/chat.tool';

@Injectable()
export class AIService {
  constructor(
    private weatherTool: WeatherTool,
    private drinkTool: DrinkRecommendationTool,
    private chatTool: ChatTool,
  ) {}
  async recommendDrink(lat: number, lon: number) {
    const weather = await this.weatherTool.getWeather(lat, lon);
    const result = await this.drinkTool.recommend(weather);
    return {
      weather,
      ...result,
    };
  }

  async chat(message: string) {
    return this.chatTool.chat(message);
  }
}
