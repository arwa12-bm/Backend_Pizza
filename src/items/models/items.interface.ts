export interface Item {
    id: string;
    title: string;
    imageUrl: string;
    detail?:Detail;
    basicComposition: BasicComposition;
    categoryParent?: string;

}



export interface BasicComposition {
    id: number;
    rank: number;
    title: string;
    detail:Detail;
    quantity: number;
    isVisible: boolean;
    isObligatory: boolean;
}

export interface Detail {
    Taille: string[];
    price: number[];
}




