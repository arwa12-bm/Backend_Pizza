import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cardEntity } from '../models/card.entity';
import { Repository } from 'typeorm';
import { card } from '../models/card.interface';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(cardEntity)
        private readonly cardReposotory:Repository<cardEntity>
    ){}
    
    async createCard(card:card): Promise<card>{
        return this.cardReposotory.save(card)
    }
    async findOne(condition: any): Promise<card> {
        return  this.cardReposotory.findOne( condition );

    }
    
    findAllCard():Promise<card[]>{
        return this.cardReposotory.find()
    }
}
