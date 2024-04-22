import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {  BasicComposition} from "./items.interface";

@Entity('items')
export class itemsEntity{
    @PrimaryGeneratedColumn()
    id:string

    @Column({default: ""})
    title:string;

    @Column({ type: 'float',default: 0.00})
    price:number;

    @Column({ default: 0}) 
    ranks: number;

    @Column({default: ""})
    imageUrl: string;

    @Column({ type: 'jsonb', default: { id: 0 , rank: 0, title: '', quantity:1 , isVisible: true, isObligatory: true } })
    basicComposition: BasicComposition;

    @Column({default: ""})
    categoryParent:string;

    @Column({ type: 'jsonb' }) 
    allergens?: string[];

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;

}