import { Articolo } from "./articolo";

export interface Ricevuta{
    nome_ricevuta:string,
    articoli:Articolo[],
    prezzo_totale:number,
    numero_articoli:number,
    numero_sconti:number
}