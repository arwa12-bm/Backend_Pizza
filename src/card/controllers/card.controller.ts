import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CardService } from '../services/card.service';
import { Item, SupplimentComposition, card, categories, shoplist } from '../models/card.interface';

@Controller('card')
export class CardController {
    constructor(
        private cardServices:CardService
    ){}
    @Post('AddCard')
    async AddCard(
        @Body('title')  title:string,
        @Body('items')  items:Item[],
        @Body('SupplimentComposition')  SupplimentComposition:SupplimentComposition[],
        @Body('shoplist')  shoplist:shoplist[],
        @Body('categories')  categories:categories[],

    ){
        const card = await this.cardServices.createCard({title,items,SupplimentComposition,shoplist,categories})
        return card
    }
    @Get("card")
    async card(){
        try{
            const card = await this.cardServices.findOne({where:{id:1}});
            return card
        }catch(e){
            return{message:'Get card error:', e}
        }

    }
    @Get()
    findAll():Promise<card[]>{
        return this.cardServices.findAllCard()
    }
}
