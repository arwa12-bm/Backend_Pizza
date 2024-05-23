import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { categories } from '../models/categories.interface';
import { CategoriesService } from '../services/categories.service';
import { CardService } from 'src/card/services/card.service';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
@Controller('categories')
export class CategoriesController {
    constructor(
        private categoriesServices:CategoriesService, private cardService:CardService
    ){}
    
    @Post('Addcategories')
    async AddCategories(
        @Body('id')  id: string,
        @Body('items')  items: string[],
        @Body('title')  title: string,
        @Body('idCard')  idCard: number,
        @Body('imageUrl')  imageUrl:string,
        @Body('shopParent')  shopParent: string[],

    ){ 
        try{
        const categories = await this.categoriesServices.createCategories({id,items,title,idCard,imageUrl,shopParent});
        // return categories;
        return categories;
        }catch(e){
            return{message:"Categories error:",e}
        }
        
    }
    @Get()
    findAll():Promise<categories[]>{
        return(this.categoriesServices.findAllcategories())
    }
    @Delete(':id')
    delete(@Param('id') id:number){
        return(this.categoriesServices.deleteCategorie(id))
    }
    @Put(':id')
    update(
        @Param('id') id:number,
        @Body() categories:categories
    ):Observable<UpdateResult>{
        return(this.categoriesServices.updateCategorie(id,categories))
    }

}
