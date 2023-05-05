export class RicevutaStorico {
  constructor(
    public receipt_number?: string,
    public storno_number?: string,
    public receipt_year?: string,
    public store_id?: string,
    public receipt_type?: string,
    public date?: Date
  ) {}
}
