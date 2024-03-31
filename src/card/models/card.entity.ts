import { timeStamp } from "console";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {  Item, SupplimentComposition, categories, shoplist } from "./card.interface";

@Entity('card')
export class cardEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({default: ""})
    title:string;

    @Column({ type: 'jsonb' }) 
    items: Item[];

    @Column({ type: 'jsonb' })
    SupplimentComposition:SupplimentComposition[];

    @Column({ type: 'jsonb' }) 
    shoplist: shoplist[];

    @Column({ type: 'jsonb' }) 
    categories: categories[];

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;

}