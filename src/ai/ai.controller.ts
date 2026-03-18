import { Controller, Get, Query } from '@nestjs/common';
import { AIService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AIService) {}

  @Get('recommend')
  recommend(@Query('lat') lat: number, @Query('lon') lon: number) {
    return this.aiService.recommendDrink(lat, lon);
  }

  @Get('chat')
  
}
