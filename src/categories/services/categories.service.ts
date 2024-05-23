import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { categoriesEntity } from '../models/categories.entity';
import { categories } from '../models/categories.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(categoriesEntity)
        private readonly categoriesReposotory:Repository<categoriesEntity>
    ){}
    
    async createCategories(categories:categories): Promise<categories>{
        return this.categoriesReposotory.save(categories)
    }
    async findOne(condition: any): Promise<categories> {
        return  this.categoriesReposotory.findOne( condition );

    }
    findAllcategories():Promise<categories[]>{
        return this.categoriesReposotory.find()
    }
    deleteCategorie(id:number):Observable<DeleteResult>{
        return from(this.categoriesReposotory.delete(id))
    }
    updateCategorie(id:number,categories:categories):Observable<UpdateResult>{
        return from(this.categoriesReposotory.update(id,categories))
    }
}
