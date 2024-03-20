export interface panier{
    id?:number;
    cartItem?:CartItem[];
    id_user?:number;
    etat?:string;
    createdAt?:Date;
}

export interface CartItem {
    checkedItems: { [itemName: string]: boolean };
    data: any;
    quantity: number;
    sup: any; // You may need to specify the type of this property if it has a specific structure
}