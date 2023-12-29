import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CareerCardsService {
  private careercards = [];

  createCareerCard(careerCardData: any) {
    const newCareerCard = { id: Date.now().toString(), ...careerCardData };
    this.careercards.push(newCareerCard);
    return newCareerCard;
  }

  getAllCareerCards() {
    return this.careercards;
  }

  getCareerCardById(id: string) {
    const careerCard = this.careercards.find((card) => card.id === id);
    if (!careerCard) {
      throw new NotFoundException('Career card not found');
    }
    return careerCard;
  }

  deleteCareerCard(id: string) {
    const index = this.careercards.findIndex((card) => card.id === id);
    if (index === -1) {
      throw new NotFoundException('Career card not found');
    }
    this.careercards.splice(index, 1);
    return { message: 'Career card deleted successfully' };
  }
  editCareerCard(id: string, careerCardData: any) {
    const index = this.careercards.findIndex((card) => card.id === id);
    if (index === -1) {
      throw new NotFoundException('Career card not found');
    }

    // Update career card data with new values
    this.careercards[index] = { ...this.careercards[index], ...careerCardData };

    return this.careercards[index];
  }
}
