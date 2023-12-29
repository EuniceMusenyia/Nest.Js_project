import { Module } from '@nestjs/common';
import { CareerCardsService } from './careerCards.service';
import { CareerCardsController } from './careerCards.controller';

@Module({
  providers: [CareerCardsService],
  controllers: [CareerCardsController],
})
export class CareerCardsModule {}
