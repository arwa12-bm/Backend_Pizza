export interface categories {
    id: string;
    color: string;
    items: string[];
    ranks: rank;
    title: string;
    video: video;
    idCard: number;
    archive: boolean;
    imageUrl: imageUrl;
    description: description;
    categoryChild: any[]; // This might need further definition
    categoryParent: string;


}
export interface video {
    url: string;
    type: string;
    }
export interface rank{
    default: number;
    orderOverride: {
    Order: number;
    IdShop: number;
    };
    }
export interface imageUrl {
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
export  interface   description {
        Default: {
            impression: any[]; // This might need further definition
            nameDefault: string;
            salesSupport: any[]; // This might need further definition
        };
        }