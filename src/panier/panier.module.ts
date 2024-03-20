import { Module } from '@nestjs/common';
import { PanierService } from './services/panier.service';
import { PanierController } from './controllers/panier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { panierEntity } from './models/panier.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({  imports:[
  TypeOrmModule.forFeature([panierEntity]),
  
],
  providers: [PanierService],
  controllers: [PanierController]
})
export class PanierModule {}
