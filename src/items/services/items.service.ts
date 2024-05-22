import { Injectable } from '@nestjs/common';
import { itemsEntity } from '../models/items.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Item } from '../models/items.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class ItemsService { 
    constructor(
    @InjectRepository(itemsEntity)
    private readonly itemsReposotory:Repository<itemsEntity>
){}

async createItem(item:Item): Promise<Item>{
    return this.itemsReposotory.save(item)
}
findAllItem():Promise<Item[]>{
    return this.itemsReposotory.find()
}

deleteItem(id:number):Observable<DeleteResult>{
    return from(this.itemsReposotory.delete(id))
}

updateItem(id:number,item:Item):Observable<UpdateResult>{
    return from(this.itemsReposotory.update(id,item))
}
}
