export interface card{
    id?:number;
    title:string;
    items?:Item[];
    SupplimentComposition?:SupplimentComposition[];
    shoplist?:shoplist[];
    categories?:categories[];
    createdAt?:Date;
}


interface BasicCompositionItem {
    id: number;
    rank: number;
    title: string;
    quantity: number;
    isVisible: boolean;
    isObligatory: boolean;
}

interface BasicComposition {
[key: string]: BasicCompositionItem;
}

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
export interface SupplimentComposition  {
    id: number;
    rank: number;
    title: string;
    quantity: number;
    price: number;
    isVisible: boolean;
    isObligatory: boolean;
}

export interface shoplist {
    id: string;
    town: string;
    image: string;
    nature: string;
    shopid: number;
    address: string;
    company: string;
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    tel: string;
    villelivraison: {
    [key: string]: {
        nom: string;
        fraislivraison: string;
        mincommande: string;
    };
    };
    horaire: {
    [key: string]: string;
    };
    responsible: string;
    etat: string;
}

export interface categories {
    id: string;
    color: string;
    items: string[];
    ranks: {
    default: number;
    orderOverride: {
    Order: number;
    IdShop: number;
    }[];
    };
    title: string;
    video: {
    url: string;
    type: string;
    };
    idCard: number;
    archive: boolean;
    imageUrl: {
    Default: {
        urlDefault: string;
        salesSupport: any[]; // This might need further definition
    };
    override: {
        shopId: string;
        info: any[]; // This might need further definition
        salesSupport: any[]; // This might need further definition
    }[];
    };
    reference: string;
    linkedTags: string[];
    description: {
    Default: {
        impression: any[]; // This might need further definition
        nameDefault: string;
        salesSupport: any[]; // This might need further definition
    };
    };
    displayName: {
        Default: {
        impression: any[]; // This might need further definition
        nameDefault: string;
        salesSupport: {
        Langue: {
            value: string;
            visibility: boolean;
            designation: string;
        }[];
        visibility: boolean;
        sellingSupport: string;
        }[];
    };
    };
    categoryChild: any[]; // This might need further definition
    categoryParent: string;
    visibilityInfo: {
    default: {
    [key: string]: {
        id: string;
        visibility: boolean;
        sellingSupport: {
        visibility: boolean;
        sellingSupport: string;
        }[];
    };
    };
    isVisible: boolean;
    basicCompositionVisibility: boolean;
};
isNameDisplayed: boolean;
linkedChildCategories: any[]; // This might need further definition
isInformationModeActivated: boolean;
}