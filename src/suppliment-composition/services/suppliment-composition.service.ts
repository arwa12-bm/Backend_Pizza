import { Injectable } from '@nestjs/common';
import { SuppCompEntity } from '../models/SupplimentComposition.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplimentComposition } from '../models/SupplimentComposition.interface';

@Injectable()
export class SupplimentCompositionService {
    constructor(
        @InjectRepository(SuppCompEntity)
        private readonly SupplimentCompositionReposotory:Repository<SuppCompEntity>
    ){}
    
    async createSuppComp(item:SupplimentComposition ): Promise<SupplimentComposition >{
        return this.SupplimentCompositionReposotory.save(item)
    }
    findAllSuppComp():Promise<SupplimentComposition[]>{
        return this.SupplimentCompositionReposotory.find()
    }
}
