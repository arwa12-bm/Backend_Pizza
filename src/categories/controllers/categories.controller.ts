import { Body, Controller, Get, Post } from '@nestjs/common';
import { categories, description, imageUrl, rank, video } from '../models/categories.interface';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(
        private categoriesServices:CategoriesService
    ){}
    
    @Post('Addcategories')
    async AddCategories(
        @Body('id')  id: string,
        @Body('color')  color: string,
        @Body('items')  items: string[],
        @Body('ranks')  ranks: rank,
        @Body('title')  title: string,
        @Body('video')  video: video,
        @Body('idCard')  idCard: number,
        @Body('archive')  archive: boolean,
        @Body('imageUrl')  imageUrl:imageUrl,
        @Body('description')  description: description,
        @Body('categoryChild')  categoryChild: any[],
        @Body('categoryParent')  categoryParent: string,

    ){ 
        try{
        const categories = await this.categoriesServices.createCategories({id,color,items,ranks,title,video,idCard,archive,imageUrl,description,categoryChild,categoryParent});
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
