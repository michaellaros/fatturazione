import { iva } from "./iva";

export interface Articolo{
    cod_articolo:string,
    desc_articolo:string,
    prezzo:number,
    quantita:number,
    flg_isDiscount:boolean,
    prezzo_totale_articolo:number,
    ivaArticolo:iva

}