
export interface shoplist {
    id: string;
    town: string;
    image: string;
    Nature: string;
    shopid: number;
    Address: string;
    Company: string;
    Country: string;
    PostalCode: string;
    latitude: number;
    longitude: number;
    tel: string;
    villelivraison: villelivraison;
    horaire:horaire ;
    Responsible: string;
    etat: string;
}
export interface villelivraison {
    [key: string]: {
        nom: string;
        fraislivraison: string;
        mincommande: string;
    };
    };

export interface horaire {
    [key: string]: string;
    }
