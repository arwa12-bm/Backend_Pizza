import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { panierEntity } from '../models/panier.entity';
import { DeleteResult, Repository } from 'typeorm';
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
    
    async findOne(condition: any): Promise<panier> {
        return  this.panierReposotory.findOne( condition );

    }
    deletePanier(id_user: number): Observable<DeleteResult> {
        return from(this.panierReposotory.delete({ id_user :id_user , etat: 'non payé' }));
    }
}
