import { timeStamp } from "console";
import { Column, Entity, PrimaryColumn } from "typeorm";
import {  description, imageUrl, rank, video} from "./categories.interface";

@Entity('categories')
export class categoriesEntity{
    @PrimaryColumn()
    id:string

    @Column({default: ""})
    color:string; 

    @Column( {type: "simple-array"})
    items:string[];

    @Column({ type: 'jsonb' }) 
    ranks:rank;

    @Column({default: ""})
    title:string;

    @Column({ type: 'jsonb' }) 
    video:video;

    @Column({})
    idCard:number;

    @Column({default: false})
    archive:boolean;

    @Column({ type: 'jsonb' })
    imageUrl:imageUrl;

    @Column({ type: 'jsonb' })
    description:description;

    @Column( {type:"simple-array"})
    categoryChild:any[];

    @Column({default: ""})
    categoryParent:string;

}