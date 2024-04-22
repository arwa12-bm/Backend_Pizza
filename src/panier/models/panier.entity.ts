import { timeStamp } from "console";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CartItem, ModeRetrait } from "./panier.interface";

@Entity('panier')
export class panierEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({ type: 'jsonb' }) // Change the data type to 'jsonb'
    cartItem: CartItem[];

    @Column({default:"non payé"})
    etat:string
    
    @Column({default: ""})
    etat_Commande:string
    
    @Column({ type: 'jsonb', default:null })
    ModeRetrait:ModeRetrait;

    @Column({ type: 'float',default: 0.00})
    prix:number;

    @Column({})
    id_user:number;


    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;

}