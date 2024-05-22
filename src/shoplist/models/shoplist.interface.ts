
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
    etat: string;
}
export interface villelivraison {
    [key: string]: {
        nom: string;
        fraislivraison: string;
        mincommande: string;
    };
    };

export interface horaire{
    LUNDI: { firstStart: string; firstEnd: string; secondStart: string; secondEnd: string };
    MARDI: { firstStart: string; firstEnd: string; secondStart: string; secondEnd: string };
    MERCREDI: { firstStart: string; firstEnd: string; secondStart: string; secondEnd: string };
    JEUDI: { firstStart: string; firstEnd: string; secondStart: string; secondEnd: string };
    VENDREDI: { firstStart: string; firstEnd: string; secondStart: string; secondEnd: string };
    SAMEDI: { firstStart: string; firstEnd: string; secondStart: string; secondEnd: string };
    DIMANCHE: { firstStart: string; firstEnd: string; secondStart: string; secondEnd: string };
}
