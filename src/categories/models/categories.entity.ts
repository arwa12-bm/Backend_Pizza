import { timeStamp } from "console";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class categoriesEntity{
    @PrimaryGeneratedColumn()
    id:string; 

    @Column( {type: "simple-array", default: []})
    items:string[];

    @Column({default: ""})
    title:string;

    @Column({default: 0})
    idCard:number;

    @Column({ default:"" })
    imageUrl:string;

    @Column({type: "simple-array", default: []})
    shopParent:string[];

}