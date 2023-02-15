import { Articolo } from "./articolo";
import { iva } from "./iva";

export interface Ricevuta{
    nome_ricevuta:string,
    articoli:Articolo[],
    prezzo_totale:number,
    riepilogoIva:iva[]
}