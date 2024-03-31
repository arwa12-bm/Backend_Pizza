export interface Item {
    id: string;
    color?: string;
    price: Price;
    title: string;
    ranks?: rank[] ;
    imageUrl: imageUrl;
    basicComposition: BasicComposition;
    categoryParent?: string;
    allergens?: string[]; // Assuming these are IDs of allergens

}

export interface rank{
    default: number; orderOverride: { Order: number; IdShop: number }
}
export interface imageUrl{
    Default: { urlDefault: string; salesSupport: any[] };
    override: { shopId: string }[];
}

export interface Price {
    tva: number | null;
    default: number;
    priceHT: number;
    override: any[]; // Define the correct type if needed
    advancedPrice: {
    [key: string]: {
        tva: number | null;
        priceHT: number;
        pricettc: number;
        methodePrice: string;
        scheduledPrice: any[]; // Define the correct type if needed
        originalKeyElements: { id: string; title: string }[];
    };
    };
    saleModeVatRates: { saleModeUuid: string }[];
}

export interface BasicComposition {
    id: number;
    rank: number;
    title: string;
    quantity: number;
    isVisible: boolean;
    isObligatory: boolean;
}




