import { Body, Controller, Get, Post } from '@nestjs/common';
import { categories } from '../models/categories.interface';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(
        private categoriesServices:CategoriesService
    ){}
    
    @Post('Addcategories')
    async AddCategories(
        @Body('id')  id: string,
        @Body('items')  items: string[],
        @Body('ranks')  ranks: number,
        @Body('title')  title: string,
        @Body('idCard')  idCard: number,
        @Body('imageUrl')  imageUrl:string,
        @Body('categoryChild')  categoryChild: any[],
        @Body('categoryParent')  categoryParent: string,

    ){ 
        try{
        const categories = await this.categoriesServices.createCategories({id,items,ranks,title,idCard,imageUrl,categoryChild,categoryParent});
        return categories;
        }catch(e){
            return{message:"Categories error:",e}
        }
        
    }
    @Get()
    findAll():Promise<categories[]>{
        return(this.categoriesServices.findAllcategories())
    }
}
