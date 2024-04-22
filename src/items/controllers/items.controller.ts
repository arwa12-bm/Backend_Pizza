import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemsService } from '../services/items.service';
import { BasicComposition, Item } from '../models/items.interface';
import { CardService } from 'src/card/services/card.service';

@Controller('items')
export class ItemsController {
    constructor(
    private itemsServices:ItemsService,
    private cardService:CardService
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
    const AllItems = await this.itemsServices.findAllItem();
    const entityToUpdate:any=await this.cardService.findOne({where:{id:1}})
    if (!entityToUpdate) {
        // Handle entity not found error
        throw new Error('Entity not found');
        }
    
        // Update the column
        entityToUpdate.items = AllItems;
    
        // Save the updated entity
        return await this.cardService.createCard(entityToUpdate);
        
    }catch(e){
        return{message:"items error:",e}
    }
    
}
@Get()
findAll():Promise<Item[]>{
    return(this.itemsServices.findAllItem())
}


}