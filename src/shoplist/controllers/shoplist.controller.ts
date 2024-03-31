import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShoplistService } from '../services/shoplist.service';
import { horaire, shoplist, villelivraison } from '../models/shoplist.interface';

@Controller('shoplist')
export class ShoplistController {
    constructor(
        private shoplistServices:ShoplistService
    ){}
    
    @Post('AddItems')
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
        @Body('Responsible')  Responsible: string,
        @Body('etat')  etat: string,


    ){ 
        try{
        const items = await this.shoplistServices.createShop({id,town,image,Nature,shopid,Address,Company,Country,PostalCode,latitude,longitude,tel,villelivraison,horaire,Responsible,etat});
        return items;
        }catch(e){
            return{message:"items error:",e}
        }
        
    }
    @Get()
    findAll():Promise<shoplist[]>{
        return(this.shoplistServices.findAllShop())
    }

    
}
