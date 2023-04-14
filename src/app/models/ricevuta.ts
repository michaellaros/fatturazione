import { Articolo } from './articolo';
import { Iva } from './iva';

export interface Ricevuta {
  nome_ricevuta: string;
  articoli: Articolo[];
  prezzo_totale: number;
  riepilogoIva: Iva[];
}
