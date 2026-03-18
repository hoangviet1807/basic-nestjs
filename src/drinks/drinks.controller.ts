import { Controller, Get, Param, Query } from '@nestjs/common';
import { DrinksService } from './drinks.service';

@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Get()
  findAll() {
    return this.drinksService.findAll();
  }

  @Get('recommend')
  getRecommended(@Query('tag') tag: string) {
    return this.drinksService.findByTag(tag);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drinksService.findOne(id);
  }
}
