import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { shoplistEntity } from '../models/shoplist.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { shoplist } from '../models/shoplist.interface';
import { Observable, from } from 'rxjs';

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
    deleteShop(id:number):Observable<DeleteResult>{
        return from(this.shoplistReposotory.delete(id))
    }
    
    updateShop(id:number,shoplist:shoplist):Observable<UpdateResult>{
        return from(this.shoplistReposotory.update(id,shoplist))
    }
}
