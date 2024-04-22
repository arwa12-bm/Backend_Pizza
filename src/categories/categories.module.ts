import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { categoriesEntity } from './models/categories.entity';
import { CardService } from 'src/card/services/card.service';
import { cardEntity } from 'src/card/models/card.entity';

@Module({imports:[
    TypeOrmModule.forFeature([categoriesEntity]),
    TypeOrmModule.forFeature([cardEntity])
  ],

  providers: [CategoriesService,CardService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
