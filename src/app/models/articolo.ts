import { Iva } from './iva';

export class Articolo {
  constructor(
    public cod_articolo?: string,
    public desc_articolo?: string,
    public prezzo?: number,
    public quantita?: number,
    public discount?: number,
    public totalDiscount?: number,
    public prezzo_totale_articolo?: number,
    public ivaArticolo?: Iva
  ) {}
}
