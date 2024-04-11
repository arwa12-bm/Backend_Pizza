import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { user } from '../models/user.interface';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Response,Request } from 'express';


@Controller('user')
export class UserController {
    constructor(
        private userServices:UserService,
        private readonly jwtServices:JwtService,
        ){}

    @Post('register')
        async register(
            @Body('nom')  nom:string,
            @Body('prénom')  prénom:string,
            @Body('email')  email:string,
            @Body('télephone')  télephone:number,
            @Body('password')  password:string,
            @Body('createdAt')  createdAt:Date,

        ){
            const existingUser = await this.userServices.findOne({where:{email}});
            if (existingUser) {
                // Si un utilisateur avec cet e-mail existe déjà, lancez une exception de conflit
                throw new BadRequestException('Adresse e-mail existe déjà')
            }
                const hashedPassword = await bcrypt.hash(password, 12);
                const user = await this.userServices.createUser({
                            nom,
                            prénom,
                            email,
                            télephone,
                            password:hashedPassword,
                            createdAt
                });
                delete user.password;
                return {message: 'success'};
    }
    
    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response :Response
    ) {
        try {
            // Handle the case when the user is found
            const user = await this.userServices.findOne({where:{email}});
            if(!user){
                throw new BadRequestException('votre email est incorrecte')
            }
            if(!await bcrypt.compare(password,user.password)){
                throw new BadRequestException('votre mot de passe est incorrecte')
            }else{
                const jwt =await this.jwtServices.signAsync({id: user.id})
                response.cookie('jwt',jwt,{httpOnly:true })
                return {message: 'success'};
            }    
        } catch (error) {
            // Handle the case when the user is not found
            return {message: 'User not found:',error};
        }
    }

    @Get('user')
        async user(@Req() request:Request){
            try{
                const cookie = request.cookies['jwt'];
                const data = await this.jwtServices.verifyAsync(cookie);
                if(!data){
                    throw new BadRequestException('invalid credentials')
                }
                const user = await this.userServices.findOne({where:{id:data['id']}});
                const {password,...result} = user;
                console.log(user)
                return result;
            } catch (error) {
                // Handle the case when the user is not found
                return{message:'Get user from cookie error:', error}
            }
            
    }

    @Post('logout')
    async logout(@Res({passthrough:true}) response:Response){
        try{
            response.clearCookie('jwt');
        return {message:"success"}
        }catch(e){
            return{message:"logout error:",e}
        }
        
    }


    @Get()
    findAll():Observable<user[]>{
        return(this.userServices.findAllUser())
    }

    @Put(':id')
    update(
        @Param('id') id:number,
        @Body() user:user
    ):Observable<UpdateResult>{
        return(this.userServices.updateUser(id,user))
    }

    @Delete(':id')
    delete(@Param('id') id:number){
        return(this.userServices.deleteUser(id))
    }
    @Post('checkout')
    async handleCheckout(@Body() body: { user_id: string, paymentMethodNonce: string ,TotalAmount:number}) {
        try {
            const { user_id, paymentMethodNonce ,TotalAmount} = body;
            const result = await this.userServices.processCheckout(user_id, paymentMethodNonce,TotalAmount);
            return { result };
        } catch (error) {
            console.error('Error during checkout:', error);
            return { error: error.message || 'Internal Server Error' };
        }
    }
    

}
