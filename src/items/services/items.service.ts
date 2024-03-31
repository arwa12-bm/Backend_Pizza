import { Injectable } from '@nestjs/common';
import { itemsEntity } from '../models/items.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../models/items.interface';

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
}
