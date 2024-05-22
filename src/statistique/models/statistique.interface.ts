
export interface stat {
    id: string;
    date:string;
    information: info
    etat: string;
}
export interface info {
        [title: string]: {nbrFois :number,heures:string[]} 
    };
