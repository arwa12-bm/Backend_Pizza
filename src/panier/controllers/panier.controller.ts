import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { PanierService } from '../services/panier.service';
import { CartItem, ModeRetrait, panier } from '../models/panier.interface';
import { UpdateResult } from 'typeorm';
import { Observable } from 'rxjs';
import { info } from 'src/statistique/models/statistique.interface';


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
            @Body('shop')  shop:number,
            @Body('ModeRetrait')  ModeRetrait:ModeRetrait,
            @Body('createdAt')  createdAt:Date,

        ){
            const panier = await  this.panierServices.createPanier({cartItem,id_user,etat,prix,ModeRetrait,shop,createdAt})
            return panier;
        }
    @Get(':id')
        async panier( 
            @Param('id') id_user:number,
        ){
            try{
                const panier = await this.panierServices.findPanier({where:{ id_user :id_user,etat: 'non payé', etat_Commande:''}})
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
                const commande = await this.panierServices.findPanier({where:{ id_user :id_user}})
                return commande ;
            }catch(e){
                return{message:'Get commande error:', e}

            }

        }

    @Get()
    findAll():Observable<panier[]>{
        return(this.panierServices.findAllPanier())
    }

    @Get("stat/1")
async findDay(): Promise<any> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate()-7); // Subtract 7 days from today
console.log(oneWeekAgo.toISOString().split('T')[0]);
const cmd:any  =await this.panierServices.findPanierAfterDate(oneWeekAgo);
// Object to store the counts of each title
const titleCounts: info = {};

for (const order of cmd) {
    for (const item of order.cartItem as any[]) {
        const title: any = item.data.title;
        // Update titleCounts
        if (!titleCounts[title]) {
            titleCounts[title] = { nbrFois: 0, heures: [] };
        }
        titleCounts[title].nbrFois++; // Increment count
        const date =order.createdAt
        const heure = date.toISOString().split('T')[1].split(".")[0]
        titleCounts[title].heures.push(heure); // Store order creation time
    }
}

    console.log(titleCounts);
    return titleCounts ;
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
    @Put('CmdPassee/:id')
    async updatePassée(
        @Param('id') id_user:number,
    ):Promise<UpdateResult>{
        console.log({id_user});
        
            const commande = await this.panierServices.findPanier({where:{ id_user :id_user,etat: 'non payé',etat_Commande:''}})
            console.log({commande});
            
            return(this.panierServices.updatePanierPassée(commande[0].id))
        
    }

    

    @Put('livrer/:id')
    async updateLivrer(
        @Param('id') id:number,
    ):Promise<UpdateResult>{
            return(this.panierServices.updatePanierExpédié(id))
        
    }

    @Put('EncoursLiv/:id')
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
