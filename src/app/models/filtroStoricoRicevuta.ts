export class FiltroStoricoRicevuta {
  constructor(
    public receipt_number?: string | null,
    public date_start?: string | null,
    public date_end?: string | null,
    public store_id?: number | null
  ) {}
}
