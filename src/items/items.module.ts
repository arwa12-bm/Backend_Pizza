import { Module } from '@nestjs/common';
import { ItemsService } from './services/items.service';
import { ItemsController } from './controllers/items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { itemsEntity } from './models/items.entity';
import { cardEntity } from 'src/card/models/card.entity';
import { CardService } from 'src/card/services/card.service';
import { CategoriesService } from 'src/categories/services/categories.service';
import { categoriesEntity } from 'src/categories/models/categories.entity';

@Module({imports:[
  TypeOrmModule.forFeature([itemsEntity]),
  TypeOrmModule.forFeature([categoriesEntity])
],
  providers: [ItemsService,CategoriesService],
  controllers: [ItemsController]
})
export class ItemsModule {}
