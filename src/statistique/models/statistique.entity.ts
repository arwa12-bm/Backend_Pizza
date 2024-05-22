import { timeStamp } from "console";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { info } from "./statistique.interface";

@Entity('statistique')
export class statistiqueEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({default:""})
    date:string; 

    @Column({ type: 'jsonb' })
    information:info; 

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;

}