import { Module } from '@nestjs/common';
import { ItemsService } from './services/items.service';
import { ItemsController } from './controllers/items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { itemsEntity } from './models/items.entity';

@Module({imports:[
  TypeOrmModule.forFeature([itemsEntity]),
],
  providers: [ItemsService],
  controllers: [ItemsController]
})
export class ItemsModule {}
