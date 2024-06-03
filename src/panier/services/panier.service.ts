import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { panierEntity } from '../models/panier.entity';
import { DeleteResult, Repository, UpdateResult, MoreThan,MoreThanOrEqual } from 'typeorm';
import { Observable, from } from 'rxjs';
import { panier } from '../models/panier.interface';
import { Op } from "sequelize";



@Injectable()
export class PanierService {
    constructor(
        @InjectRepository(panierEntity)
        private readonly panierReposotory:Repository<panierEntity>
    ){}
    
    async createPanier(panier:panier): Promise<panier>{
        return this.panierReposotory.save(panier);
    }
    
    findPanier(condition: any): Promise<panier[]> {
        return  this.panierReposotory.find( condition );

    }
    async findPanierAfterDate(oneWeekAgo:Date): Promise<panier[]> {
        const dateToCompare = new Date(oneWeekAgo);
    
    return this.panierReposotory.find({
        where: {
        createdAt: MoreThanOrEqual(dateToCompare)
        }
    });
    }


    findAllPanier(): Observable<panier[]> {
        return  from(this.panierReposotory.find());

    }
    deletePanier(id_user: number): Promise<DeleteResult> {
        return this.panierReposotory.delete({ id_user :id_user , etat: 'non payé', etat_Commande:''});
    }
    updatePanierPayéCart(id:number):Promise<UpdateResult>{
        return this.panierReposotory.update({ id }, { etat: 'payé',etat_Commande:'Passée'})
    }
    updatePanierEncoursPreparation(id:number):Promise<UpdateResult>{
        return this.panierReposotory.update({ id }, { etat_Commande:'En cours de préparation'})
    }
    updatePanierEncoursLivraison(id:number):Promise<UpdateResult>{
        return this.panierReposotory.update({ id }, { etat_Commande:'En cours de livraison'})
    }
    updatePanierPassée  (id:number):Promise<UpdateResult>{
        return this.panierReposotory.update({ id }, { etat_Commande:'Passée'})
    }
    updatePanierExpédié(id:number):Promise<UpdateResult>{
        return this.panierReposotory.update({ id }, {etat: 'payé', etat_Commande:'Expédié'})
    }



 
}
