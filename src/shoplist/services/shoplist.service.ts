import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { shoplistEntity } from '../models/shoplist.entity';
import { Repository } from 'typeorm';
import { shoplist } from '../models/shoplist.interface';

@Injectable()
export class ShoplistService {
    constructor(
        @InjectRepository(shoplistEntity)
        private readonly shoplistReposotory:Repository<shoplistEntity>
    ){}
    
    async createShop(shoplist:shoplist): Promise<shoplist>{
        return this.shoplistReposotory.save(shoplist)
    }
    findAllShop():Promise<shoplist[]>{
        return this.shoplistReposotory.find()
    }
}
