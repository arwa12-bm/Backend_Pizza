import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { PanierService } from '../services/panier.service';
import { CartItem, panier } from '../models/panier.interface';
import { UpdateResult } from 'typeorm';
import { Observable } from 'rxjs';

@Controller('panier')
export class PanierController {
    constructor(
        private panierServices:PanierService
    ){}
    @Post('AddPanier')
        async AddPanier(
            @Body('cartItem')  cartItem:CartItem[],
            @Body('id_user')  id_user:number,
            @Body('etat')  etat:string,
            @Body('prix')  prix:number,
            @Body('createdAt')  createdAt:Date,

        ){
            const panier = await  this.panierServices.createPanier({cartItem,id_user,etat,prix,createdAt})
            return panier;
        }
    @Get(':id')
        async panier( 
            @Param('id') id_user:number,
        ){
            try{
                const panier = await this.panierServices.findAllPanier({where:{ id_user :id_user,etat: 'non payé'}})
                return panier ;
            }catch(e){
                return{message:'Get panier error:', e}

            }

        }
    @Get('commande/:id')
        async commande( 
            @Param('id') id_user:number,
        ){
            try{
                const commande = await this.panierServices.findAllPanier({where:{ id_user :id_user,etat: 'payé'}})
                return commande ;
            }catch(e){
                return{message:'Get commande error:', e}

            }

        }
    @Delete(':id')
    delete(@Param('id') id_user:number){
        return(this.panierServices.deletePanier(id_user))
    }
    @Put(':id')
    update(
        @Param('id') id_user:number,
    ):Promise<UpdateResult>{
        return(this.panierServices.updatePanier(id_user))
    }
}
