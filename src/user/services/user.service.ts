import { BadRequestException, Injectable } from '@nestjs/common';
import { userEntity } from '../models/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { user } from '../models/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
    constructor (
    @InjectRepository(userEntity)
    private readonly userRepository:Repository<userEntity>,
    private readonly jwtServices:JwtService,
    ){}
    async createUser(user:user): Promise<user>{
        return this.userRepository.save(user);
    }

    async findOne(condition: any): Promise<user> {
        return  this.userRepository.findOne( condition );

    }
    
    findAllUser():Observable<user[]>{
        return from(this.userRepository.find())
    }
    updateUser(id:number,user:user):Observable<UpdateResult>{
        return from(this.userRepository.update(id,user))
    }
    deleteUser(id:number):Observable<DeleteResult>{
        return from(this.userRepository.delete(id))
    }


}
