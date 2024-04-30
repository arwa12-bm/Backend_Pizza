import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { PanierService } from '../services/panier.service';
import { CartItem, ModeRetrait, panier } from '../models/panier.interface';
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
            @Body('ModeRetrait')  ModeRetrait:ModeRetrait,
            @Body('createdAt')  createdAt:Date,

        ){
            const panier = await  this.panierServices.createPanier({cartItem,id_user,etat,prix,ModeRetrait,createdAt})
            return panier;
        }
    @Get(':id')
        async panier( 
            @Param('id') id_user:number,
        ){
            try{
                const panier = await this.panierServices.findPanier({where:{ id_user :id_user,etat: 'non payé'}})
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
                const commande = await this.panierServices.findPanier({where:{ id_user :id_user,etat: 'payé'}})
                return commande ;
            }catch(e){
                return{message:'Get commande error:', e}

            }

        }

    @Get()
    findAll():Observable<panier[]>{
        return(this.panierServices.findAllPanier())
    }

    @Delete(':id')
    delete(@Param('id') id_user:number){
        return(this.panierServices.deletePanier(id_user))
    }
    
    @Put('/:id')
    async updatePayé(
        @Param('id') id_user:number,
    ):Promise<UpdateResult>{
        const commande = await this.panierServices.findPanier({where:{ id_user :id_user,etat: 'non payé',etat_Commande:''}})
        return(this.panierServices.updatePanierPayéCart(commande[0].id))
    }

    @Put('Encours/:id')
    async updateEncours(
        @Param('id') id:number,
    ):Promise<UpdateResult>{
            return(this.panierServices.updatePanierEncoursPreparation(id))
        
    }
    @Put('EnAttente/:id')
    async updateEnAttente(
        @Param('id') id_user:number,
    ):Promise<UpdateResult>{
        console.log({id_user});
        
            const commande = await this.panierServices.findPanier({where:{ id_user :id_user,etat: 'non payé',etat_Commande:''}})
            console.log({commande});
            
            return(this.panierServices.updatePanierEnAttente(commande[0].id))
        
    }

    

    @Put('livrer/:id')
    async updateLivrer(
        @Param('id') id:number,
    ):Promise<UpdateResult>{
            return(this.panierServices.updatePanierExpédié(id))
        
    }

    @Put('passer/:id')
    async updatePasser(
        @Param('id') id:number,
    ):Promise<UpdateResult>{
            const commande = await this.panierServices.findPanier({where:{id}})
            for(const item in commande){
                if(commande[item].ModeRetrait.livrer === true){
                    return(this.panierServices.updatePanierEncoursLivraison(commande[0].id))
                }else{            
                    return(this.panierServices.updatePanierExpédié(commande[0].id))
                }
            }
        
    }

}
