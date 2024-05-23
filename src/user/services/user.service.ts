import {  Injectable } from '@nestjs/common';
import { userEntity } from '../models/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { user } from '../models/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { BraintreeProvider } from '../braintree.provider';
import { MailerService } from '@nestjs-modules/mailer';
import * as Twilio from 'twilio';
import { panier } from 'src/panier/models/panier.interface';



@Injectable()
export class UserService {
    constructor (
    @InjectRepository(userEntity)
    private readonly userRepository:Repository<userEntity>,
    private readonly braintreeProvider: BraintreeProvider,
    private readonly mailerService: MailerService
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
    updateUserPassword(id:number,password:string){
        return  this.userRepository.update(id,{password})
    }
    updateUserAdresse(id:number,adresse:any){
        return  this.userRepository.update(id,{adresse})
    }
    deleteUser(id:number):Observable<DeleteResult>{
        return from(this.userRepository.delete(id))
    }
    async processCheckout(user_id: string, paymentMethodNonce: string,TotalAmount:number) {
        try {
        const { gateway } = this.braintreeProvider;
        // Use the gateway object to perform Braintree operations
        const result = await gateway.transaction.sale({
            amount: TotalAmount,
            paymentMethodNonce: paymentMethodNonce,
            options: {
            submitForSettlement: true
            }
        });
        console.log({result})
        if (result.success) {
            return { result: 'success' };
        } else {
        // Check for specific authentication error
        if (result.transaction && result.transaction.processorResponseCode === '2000') {
            throw new Error('Braintree authentication error: Invalid credentials or account not configured properly');
        } else {
            throw new Error('Error processing transaction');
        }
        }
    } catch (error) {
        console.error('Error during checkout:', error);
        throw new Error('Internal Server Error');
    }
    }

    async sendEmail(to: string, subject: string, text: string) {
        try {
            await this.mailerService.sendMail({
            to,
            subject,
            text,
            });
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
        }

        googleLogin(req:any){
            if(!req.user){
                return 'No user from google'
            }
            return{
                message : 'User Info from Google',
                user : req.user ,
                
            }
        }


        async sendSms(phoneNumber: string, message: string) {
            const accountSid =process.env.accountSid
            const authToken = process.env.authToken
            const fromNumber = process.env.formNumber
    
            const client = Twilio(accountSid, authToken);
    
            try {
                const response = await client.messages.create({
                    body: message,
                    to: phoneNumber,
                    from: "+12564084334"
                });
                console.log('SMS sent successfully');
                } catch (error) {
                throw new Error('Error sending SMS: ' + error.message);
            }
        }

    


        
}
    


