import { Column, Entity, PrimaryColumn} from "typeorm";
import {  BasicComposition, Price, imageUrl, rank} from "./items.interface";

@Entity('items')
export class itemsEntity{
    @PrimaryColumn()
    id:string

    @Column({default: ""})
    color:string;

    @Column({default: ""})
    title:string;

    @Column({ type: 'jsonb' }) 
    price: Price;

    @Column({ type: 'jsonb' }) 
    ranks: rank[];

    @Column({ type: 'jsonb' })
    imageUrl: imageUrl;

    @Column({ type: 'jsonb' }) 
    basicComposition: BasicComposition;

    @Column({default: ""})
    categoryParent:string;

    @Column({ type: 'jsonb' }) 
    allergens?: string[];

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;

}