import { Body, Controller, Get, Post } from '@nestjs/common';
import { StatistiqueService } from '../services/statistique.service';
import { info } from '../models/statistique.interface';

@Controller('stat')
export class StatistiqueController {
    constructor(
        private statServices:StatistiqueService
    ){}
    @Post('AddStat')
        async AddStat(
            @Body('date')  date:string,
            @Body('information')  information:info,

        ){
            // const statregistred=await this.statServices.findStat({where :{date}})
            // console.log("ccc",{date,information});
            // console.log("ccu",statregistred.length===0);
            
            // if(statregistred.length===0){
            await  this.statServices.createStat({date,information})
            return { message: 'succès'};
            // }else return {message:"ok"}
        }
@Get()
allStat(){
    return this.statServices.findAllStat()
}

}
