import { Module } from '@nestjs/common';
import { StatistiqueService } from './services/statistique.service';
import { StatistiqueController } from './controllers/statistique.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { statistiqueEntity } from './models/statistique.entity';

@Module({ imports:[
  TypeOrmModule.forFeature([statistiqueEntity]),
  
],
  providers: [StatistiqueService],
  controllers: [StatistiqueController]
})
export class StatistiqueModule {}
