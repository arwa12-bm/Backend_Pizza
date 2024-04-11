import { timeStamp } from "console";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('categories')
export class categoriesEntity{
    @PrimaryColumn()
    id:string; 

    @Column( {type: "simple-array"})
    items:string[];

    @Column({default: 0}) 
    ranks:number;

    @Column({default: ""})
    title:string;

    @Column({default: 0})
    idCard:number;

    @Column({ default:"" })
    imageUrl:string;

    @Column( {type:"simple-array"})
    categoryChild:any[];

    @Column({default: ""})
    categoryParent:string;

}