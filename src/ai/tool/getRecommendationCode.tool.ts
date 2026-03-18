import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { mapWeatherToDrinkTag } from '../helper/recommendation.helper';

@Injectable()
export class DrinkRecommendationTool {
  constructor(private prisma: PrismaService) {}

  async recommend(weather: any) {
    const tag = mapWeatherToDrinkTag(weather);
    const drinks = await this.prisma.drinks.findMany({
      where: {
        recommendation_tag: tag,
      },
    });

    return {
      tag,
      drinks,
    };
  }
}
