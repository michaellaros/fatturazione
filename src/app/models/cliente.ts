export class Cliente {
  constructor(
    public id?: number | null,
    public business_name?: string,
    public cf?: string,
    public piva?: string,
    public passport_number?: string,
    public surname?: string,
    public name?: string,
    public client_id?: string,
    public email?: string,
    public tel_number?: string,
    public cel_number?: string,
    public address?: string,
    public city?: string,
    public zipcode?: string,

    public district_code?: string,
    public country_code?: string,
    public cod_destinazione?: string,
    public note?: string
  ) {}
}
