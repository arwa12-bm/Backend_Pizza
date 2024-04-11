import { timeStamp } from "console";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class userEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({default:''})
    nom:string;

    @Column({default:''})
    prénom:string;

    @Column({default:'client'})
    role:string;

    @Column({default:''})
    email:string;

    @Column({default:0})
    télephone:number;

    @Column({default:''})
    password:string;

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;


}