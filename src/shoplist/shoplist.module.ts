import { Module } from '@nestjs/common';
import { ShoplistService } from './services/shoplist.service';
import { ShoplistController } from './controllers/shoplist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { shoplistEntity } from './models/shoplist.entity';

@Module({imports:[
  TypeOrmModule.forFeature([shoplistEntity]),
],
  providers: [ShoplistService],
  controllers: [ShoplistController]
})
export class ShoplistModule {}
