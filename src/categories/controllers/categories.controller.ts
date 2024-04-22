import { Body, Controller, Get, Post } from '@nestjs/common';
import { categories } from '../models/categories.interface';
import { CategoriesService } from '../services/categories.service';
import { CardService } from 'src/card/services/card.service';
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
        @Body('shopParent')  shopParent: string,

    ){ 
        try{
        const categories = await this.categoriesServices.createCategories({id,items,title,idCard,imageUrl,shopParent});
        // return categories;
        const Allcategories = await this.categoriesServices.findAllcategories();
        const entityToUpdate:any=await this.cardService.findOne({where:{id:1}})
        if (!entityToUpdate) {
            // Handle entity not found error
            throw new Error('Entity not found');
          }
      
          // Update the column
          entityToUpdate.categories = Allcategories;
      
          // Save the updated entity
          return await this.cardService.createCard(entityToUpdate);
        

        }catch(e){
            return{message:"Categories error:",e}
        }
        
    }
    @Get()
    findAll():Promise<categories[]>{
        return(this.categoriesServices.findAllcategories())
    }
}
