export class Iva {
  constructor(
    public ivaGroup?: string,
    public ivaPercent?: number,
    public articlePrice?: number,
    public ivaPrice?: number,
    public groupId?: number
  ) {}
}
