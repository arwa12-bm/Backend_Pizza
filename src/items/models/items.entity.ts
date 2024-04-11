import { Column, Entity, PrimaryColumn} from "typeorm";
import {  BasicComposition} from "./items.interface";

@Entity('items')
export class itemsEntity{
    @PrimaryColumn()
    id:string

    @Column({default: ""})
    title:string;

    @Column({ type: 'float',default: 0.00})
    price:number;

    @Column({ default: 0}) 
    ranks: number;

    @Column({default: ""})
    imageUrl: string;

    @Column({ type: 'jsonb' }) 
    basicComposition: BasicComposition;

    @Column({default: ""})
    categoryParent:string;

    @Column({ type: 'jsonb' }) 
    allergens?: string[];

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;

}