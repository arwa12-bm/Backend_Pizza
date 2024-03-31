import { timeStamp } from "console";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { } from "./SupplimentComposition.interface";

@Entity('SupplimentComposition')
export class SuppCompEntity{
    @PrimaryColumn()
    id:number

    @Column({})
    rank: number;

    @Column({default: ""})
    title:string;

    @Column({})
    quantity: number;

    @Column({type: 'float',default: 0.00})
    price: number;

    @Column({default:true})
    isVisible:  boolean;
    @Column({default:true})
    isObligatory:  boolean;

}