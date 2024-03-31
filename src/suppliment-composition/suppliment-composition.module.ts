import { Module } from '@nestjs/common';
import { SupplimentCompositionService } from './services/suppliment-composition.service';
import { SupplimentCompositionController } from './controllers/suppliment-composition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppCompEntity } from './models/SupplimentComposition.entity';

@Module({imports:[
  TypeOrmModule.forFeature([SuppCompEntity]),
],
  providers: [SupplimentCompositionService],
  controllers: [SupplimentCompositionController]
})
export class SupplimentCompositionModule {}
