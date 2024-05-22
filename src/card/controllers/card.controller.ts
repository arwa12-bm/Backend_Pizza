import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CardService } from '../services/card.service';
import { Item, SupplimentComposition, card, categories, shoplist } from '../models/card.interface';
import { ItemsService } from 'src/items/services/items.service';
import { SupplimentCompositionService } from 'src/suppliment-composition/services/suppliment-composition.service';
import { ShoplistService } from 'src/shoplist/services/shoplist.service';
import { CategoriesService } from 'src/categories/services/categories.service';
import { from } from 'rxjs';

@Controller('card')
export class CardController {
    constructor(
        private cardServices:CardService,
        private itemsServices:ItemsService,
        private SuppCompServices:SupplimentCompositionService,
        private shoplistServices:ShoplistService,
        private categoriesServices:CategoriesService

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
    // @Get("card")
    // async card(){
    //     try{
    //         const card = await this.cardServices.findOne({where:{id:1}});
    //         return card
    //     }catch(e){
    //         return{message:'Get card error:', e}
    //     }

    // }
    @Get()
    async findAll():Promise<any[]>{
        const items:any[]=await this.itemsServices.findAllItem()
        const SupplimentComposition:any[] =await this.SuppCompServices.findAllSuppComp()
        const shoplist:any[] =await this.shoplistServices.findAllShop()
        const categories:any[] =await this.categoriesServices.findAllcategories()
        const card :any  = {"items":items,"SupplimentComposition":SupplimentComposition,"shoplist":shoplist, "categories": categories}
        return  card
    }
}
