import { Injectable } from '@nestjs/common';
import { statistiqueEntity } from '../models/statistique.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { stat } from '../models/statistique.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class StatistiqueService {
    constructor(
        @InjectRepository(statistiqueEntity)
        private readonly statRepository:Repository<statistiqueEntity>
    ){}
    
    async createStat(data:any): Promise<stat>{
        return this.statRepository.save(data);
    }
    
    findStat(condition: any): Promise<statistiqueEntity[]> {
        return  this.statRepository.find( condition );

    }

    findAllStat(): Observable<statistiqueEntity[]> {
        return from(this.statRepository.find());

    }
}
