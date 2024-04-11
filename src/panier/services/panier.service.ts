import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { panierEntity } from '../models/panier.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable, from } from 'rxjs';
import { panier } from '../models/panier.interface';

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

    findAllPanier(): Observable<panier[]> {
        return  from(this.panierReposotory.find());

    }
    deletePanier(id_user: number): Promise<DeleteResult> {
        return this.panierReposotory.delete({ id_user :id_user , etat: 'non payé' });
    }
    updatePanier(id_user:number):Promise<UpdateResult>{
        return this.panierReposotory.update({ id_user }, { etat: 'payé' })
    }
}
