import { Module } from '@nestjs/common';
import { ItemsService } from './services/items.service';
import { ItemsController } from './controllers/items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { itemsEntity } from './models/items.entity';
import { cardEntity } from 'src/card/models/card.entity';
import { CardService } from 'src/card/services/card.service';

@Module({imports:[
  TypeOrmModule.forFeature([itemsEntity]),
  TypeOrmModule.forFeature([cardEntity])
],
  providers: [ItemsService,CardService],
  controllers: [ItemsController]
})
export class ItemsModule {}
