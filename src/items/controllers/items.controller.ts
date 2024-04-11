import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemsService } from '../services/items.service';
import { BasicComposition, Item } from '../models/items.interface';

@Controller('items')
export class ItemsController {
    constructor(
    private itemsServices:ItemsService
){}

@Post('AddItems')
async AddItems(
    @Body('id')  id: string,
    @Body('title')  title: string,
    @Body('price')  price: number,
    @Body('ranks')  ranks: number,
    @Body('imageUrl')  imageUrl: string,
    @Body('basicComposition')  basicComposition: BasicComposition,
    @Body('categoryParent')  categoryParent: string,
    @Body('allergens') allergens: string[],
){ 
    try{
    const items = await this.itemsServices.createItem({id,title,price,ranks,imageUrl,basicComposition,categoryParent,allergens});
    return items;
    }catch(e){
        return{message:"items error:",e}
    }
    
}
@Get()
findAll():Promise<Item[]>{
    return(this.itemsServices.findAllItem())
}


}