import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ItemsService } from '../services/items.service';
import { BasicComposition, Detail, Item } from '../models/items.interface';
import { CardService } from 'src/card/services/card.service';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { CategoriesService } from 'src/categories/services/categories.service';

@Controller('items')
export class ItemsController {
    constructor(
    private itemsServices:ItemsService,
    private categoriesServices:CategoriesService,
){}

@Post('AddItems')
async AddItems(
@Body('id') id: string,
@Body('title') title: string,
@Body('imageUrl') imageUrl: string,
@Body('detail') detail: Detail,
@Body('basicComposition') basicComposition: BasicComposition,
@Body('categoryParent') categoryParent: string,
) {
try {
     // Create the new item and save it in the items table
     const items = await this.itemsServices.createItem({
        id,
        title,
        imageUrl,
        basicComposition,
        categoryParent,
        detail
        });
    // Fetch the category by its title
    const categories = await this.categoriesServices.findOne({ where: { title: categoryParent } });
    

    // Log the fetched category for debugging
    console.log(categories);
    console.log(items.id)

    // Update the items list by adding the new id
    categories.items = [...categories.items,items.id];

    // Save the updated category entity
    await this.categoriesServices.createCategories(categories);

   

    // Return the newly created item
    return items;

} catch (e) {
    // Return an error message with the error object
    return { message: "items error:", e };
}
}

@Get()
findAll():Promise<Item[]>{
    return(this.itemsServices.findAllItem())
}
@Delete(':id')
async delete(@Param('id') id: number) {
    try {
        // Fetch the category by its id
        const item = await this.itemsServices.findOne({ where: { id } });

        const categories = await this.categoriesServices.findOne({ where: {title: item.categoryParent} });

        // // Check if the category exists
        // if (!categories) {
        //     return { message: "Category not found" };
        // }

        // // Log the fetched category and id for debugging
        console.log(categories);
        console.log(id);

        // Remove the id from the items list if it exists
        if (categories.items) {
            const indexToRemove = categories.items.findIndex((itemId:any) => itemId === id);
            if (indexToRemove !== -1) {
                categories.items.splice(indexToRemove, 1);
            }
        }

        // Save the updated category entity
        await this.categoriesServices.createCategories(categories);

        // Delete the item associated with the given id
        await this.itemsServices.deleteItem(id);

        return { message: "Item deleted successfully" };
    } catch (error) {
        // Return an error message with the error object
        return { message: "Error deleting item", error };
    }
}

@Put(':id')
update(
    @Param('id') id:number,
    @Body() item:Item
):Observable<UpdateResult>{
    return(this.itemsServices.updateItem(id,item))
}


}