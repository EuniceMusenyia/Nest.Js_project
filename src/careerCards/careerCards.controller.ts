import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CareerCardsService } from './careerCards.service';

@Controller('careerCards')
export class CareerCardsController {
  constructor(private readonly careerCardsService: CareerCardsService) {}

  @Post('postCareerCard')
  createCareerCard(@Body() careerCardData: any) {
    return this.careerCardsService.createCareerCard(careerCardData);
  }
  @Get('allCareerCards')
  getAllCareerCards() {
    return this.careerCardsService.getAllCareerCards();
  }

  @Get(':id')
  getCareerCardById(@Param('id') id: string) {
    try {
      const careerCard = this.careerCardsService.getCareerCardById(id);
      return careerCard;
    } catch (error) {
      throw new NotFoundException('Career card not found');
    }
  }

  @Delete(':id')
  deleteCareerCard(@Param('id') id: string) {
    return this.careerCardsService.deleteCareerCard(id);
  }

  @Put(':id')
  editCareerCard(@Param('id') id: string, @Body() careerCardData: any) {
    return this.careerCardsService.editCareerCard(id, careerCardData);
  }
}
