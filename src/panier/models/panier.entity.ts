import { timeStamp } from "console";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./panier.interface";

@Entity('panier')
export class panierEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({ type: 'jsonb' }) // Change the data type to 'jsonb'
    cartItem: CartItem[];

    @Column({default:"non payé"})
    etat:string

    @Column({})
    id_user:number;


    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;

}