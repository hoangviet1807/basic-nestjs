import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AIService } from './ai.service';
import { WeatherTool } from './tool/getWeather.tool';
import { DrinkRecommendationTool } from './tool/getRecommendationCode.tool';
import { ChatTool } from './tool/chat.tool';

@Module({
  providers: [AIService, WeatherTool, DrinkRecommendationTool, ChatTool],
  controllers: [AiController],
})
export class AiModule {}
