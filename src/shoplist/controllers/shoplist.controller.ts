import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ShoplistService } from '../services/shoplist.service';
import { horaire, shoplist, villelivraison } from '../models/shoplist.interface';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';

@Controller('shoplist')
export class ShoplistController {
    constructor(
        private shoplistServices:ShoplistService
    ){}
    
    @Post('Addshop')
    async AddItems(
        @Body('id')  id: string,
        @Body('town')  town: string,
        @Body('image')  image: string,
        @Body('Nature')  Nature: string,
        @Body('shopid')  shopid: number,
        @Body('Address')  Address: string,
        @Body('Company')  Company: string,
        @Body('Country')  Country: string,
        @Body('PostalCode')  PostalCode: string,
        @Body('latitude')  latitude: number,
        @Body('longitude')  longitude: number,
        @Body('tel')  tel: string,
        @Body('villelivraison')  villelivraison: villelivraison,
        @Body('horaire')  horaire:horaire,
        @Body('etat')  etat: string,


    ){ 
        try{
        const items = await this.shoplistServices.createShop({id,town,image,Nature,shopid,Address,Company,Country,PostalCode,latitude,longitude,tel,villelivraison,horaire,etat});
        return items;
        }catch(e){
            return{message:"items error:",e}
        }
        
    }
    @Get()
    findAll():Promise<shoplist[]>{
        return(this.shoplistServices.findAllShop())
    }
    @Delete(':id')
    delete(@Param('id') id:number){
        return(this.shoplistServices.deleteShop(id))
    }
    @Put(':id')
    update(
        @Param('id') id:number,
        @Body() shoplist:shoplist
    ):Observable<UpdateResult>{
        return(this.shoplistServices.updateShop(id,shoplist))
    }
    
}
