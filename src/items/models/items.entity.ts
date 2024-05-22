import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {  BasicComposition, Detail} from "./items.interface";

@Entity('items')
export class itemsEntity{
    @PrimaryGeneratedColumn()
    id:string

    @Column({default: ""})
    title:string;

    @Column({default: ""})
    imageUrl: string;

    @Column({ type: 'jsonb', default: { id: 0 , rank: 0, title: '', quantity:1 , isVisible: true, isObligatory: true } })
    basicComposition: BasicComposition;

    @Column({default: ""})
    categoryParent:string;


    @Column({ type: 'jsonb', default:null })
    detail:Detail;

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;

}