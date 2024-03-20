import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { PanierService } from '../services/panier.service';
import { CartItem } from '../models/panier.interface';

@Controller('panier')
export class PanierController {
    constructor(
        private panierServices:PanierService
    ){}
    @Post('AddPanier')
        async AddPanier(
            @Body('cartItem')  cartItem:CartItem[],
            @Body('id_user')  id_user:number,
            @Body('createdAt')  createdAt:Date,

        ){
            const panier = await  this.panierServices.createPanier({cartItem,id_user,createdAt})
            return panier;
        }
    @Get(':id')
        async panier( 
            @Param('id') id_user:number,
        ){
            try{
                const panier = await this.panierServices.findOne({where:{id_user}})
                return panier ;
            }catch(e){
                return{message:'Get panier error:', e}

            }

        }
    @Delete(':id')
    delete(@Param('id') id_user:number){
        return(this.panierServices.deletePanier(id_user))
    }
}
