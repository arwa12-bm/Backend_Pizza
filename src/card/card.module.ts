import { Module } from '@nestjs/common';
import { CardService } from './services/card.service';
import { CardController } from './controllers/card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cardEntity } from './models/card.entity';
import { ItemsService } from 'src/items/services/items.service';
import { CategoriesService } from 'src/categories/services/categories.service';
import { SupplimentCompositionService } from 'src/suppliment-composition/services/suppliment-composition.service';
import { ShoplistService } from 'src/shoplist/services/shoplist.service';
import { itemsEntity } from 'src/items/models/items.entity';
import { categoriesEntity } from 'src/categories/models/categories.entity';
import { SuppCompEntity } from 'src/suppliment-composition/models/SupplimentComposition.entity';
import { shoplistEntity } from 'src/shoplist/models/shoplist.entity';

@Module({ imports:[
  TypeOrmModule.forFeature([cardEntity]),
  TypeOrmModule.forFeature([itemsEntity]),
  TypeOrmModule.forFeature([categoriesEntity]),
  TypeOrmModule.forFeature([SuppCompEntity]),
  TypeOrmModule.forFeature([shoplistEntity]),


],
  providers: [CardService,ItemsService,CategoriesService,SupplimentCompositionService,ShoplistService],
  controllers: [CardController]
})
export class CardModule {}
