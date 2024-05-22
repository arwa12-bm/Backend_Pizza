import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ItemsService } from '../services/items.service';
import { BasicComposition, Detail, Item } from '../models/items.interface';
import { CardService } from 'src/card/services/card.service';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';

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
    @Body('imageUrl')  imageUrl: string,
    @Body('detail')   detail:Detail,
    @Body('basicComposition')  basicComposition: BasicComposition,
    @Body('categoryParent')  categoryParent: string,
){ 
    try{
    const items = await this.itemsServices.createItem({id,title,imageUrl,basicComposition,categoryParent,detail});
    return items
    
    }catch(e){
        return{message:"items error:",e}
    }
    
}
@Get()
findAll():Promise<Item[]>{
    return(this.itemsServices.findAllItem())
}
@Delete(':id')
delete(@Param('id') id:number){
    return(this.itemsServices.deleteItem(id))
}
@Put(':id')
update(
    @Param('id') id:number,
    @Body() item:Item
):Observable<UpdateResult>{
    return(this.itemsServices.updateItem(id,item))
}


}