import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class DrinksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.drinks.findMany();
  }

  async findByTag(tag: string) {
    return this.prisma.drinks.findMany({
      where: {
        recommendation_tag: tag,
      },
      take: 4,
    });
  }

  async findOne(id: string) {
    return this.prisma.drinks.findUnique({
      where: {
        id,
      },
    });
  }
}
