import { IArticolo } from "./articolo";

export interface IRicevuta{
    nome_ricevuta:string,
    articoli:IArticolo[],
    prezzo_totale:number,
    numero_articoli:number,
    numero_sconti:number
}