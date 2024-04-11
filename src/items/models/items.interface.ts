export interface Item {
    id: string;
    price: number;
    title: string;
    ranks?: number;
    imageUrl: string;
    basicComposition: BasicComposition;
    categoryParent?: string;
    allergens?: string[]; // Assuming these are IDs of allergens

}



export interface BasicComposition {
    id: number;
    rank: number;
    title: string;
    quantity: number;
    isVisible: boolean;
    isObligatory: boolean;
}




