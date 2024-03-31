import { timeStamp } from "console";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import {  horaire, shoplist, villelivraison } from "./shoplist.interface";

@Entity('shoplist')
export class shoplistEntity{
    @PrimaryColumn()
    id:string

    @Column({default: ""})
    town:string; 
    @Column({default: ""})
    image:string;
    @Column({default: ""})
    Nature:string;
    @Column({})
    shopid:number;
    @Column({default: ""})
    Address:string;
    @Column({default: ""})
    Company:string;
    @Column({default: ""})
    Country:string;
    @Column({default: ""})
    PostalCode:string;
    @Column({ type: 'float',default: 0.000000})
    latitude:number;
    @Column({ type: 'float',default: 0.000000})
    longitude:number;
    @Column({default: ""})
    tel:string;
    @Column({ type: 'jsonb' }) 
    villelivraison: villelivraison;
    @Column({ type: 'jsonb' }) 
    horaire: horaire;
    @Column({default: ""})
    Responsible:string;
    @Column({default: ""})
    etat:string;

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;

}