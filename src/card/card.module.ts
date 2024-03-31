import { Module } from '@nestjs/common';
import { CardService } from './services/card.service';
import { CardController } from './controllers/card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cardEntity } from './models/card.entity';

@Module({ imports:[
  TypeOrmModule.forFeature([cardEntity]),
],
  providers: [CardService],
  controllers: [CardController]
})
export class CardModule {}
