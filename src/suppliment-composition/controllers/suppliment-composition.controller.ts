import { Body, Controller, Get, Post } from '@nestjs/common';
import { SupplimentCompositionService } from '../services/suppliment-composition.service';
import { SupplimentComposition } from 'src/card/models/card.interface';

@Controller('SuppComp')
export class SupplimentCompositionController {
    constructor(
        private SuppCompServices:SupplimentCompositionService
    ){}
    
    @Post('AddSuppComp')
    async AddSuppComp(
        @Body('id')  id: number,
        @Body('rank')  rank: number,
        @Body('title')  title: string,
        @Body('quantity')  quantity: number,
        @Body('price')  price: number,
        @Body('isVisible')  isVisible:boolean,
        @Body('isObligatory')  isObligatory:boolean,

    ){ 
        try{
        const SuppComp = await this.SuppCompServices.createSuppComp({id,rank,title,quantity,price,isVisible,isObligatory});
        return SuppComp;
        }catch(e){
            return{message:"SuppComp error:",e}
        }
        
    }
    @Get()
    findAll():Promise<SupplimentComposition[]>{
        return(this.SuppCompServices.findAllSuppComp())
    }
}
