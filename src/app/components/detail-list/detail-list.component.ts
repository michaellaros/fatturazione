import { Component, Input } from '@angular/core';
import { Iva } from 'src/app/models/iva';
import { Ricevuta } from 'src/app/models/ricevuta';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.css'],
})
export class DetailListComponent {
  columnsRicevuta: string[] = [
    'Codice',
    'Descrizione',
    'Quantita',
    'PrezzoUnit',
    'Sconto',
    'LordoIva',
    'CodIva',
  ];
  columnsIVA: string[] = [
    'CodIva',
    'Aliquota',
    'Imponibile',
    'ImportoIva',
    'Descrizione',
  ];
  @Input() ricevuta!: Ricevuta;

  constructor(private httpTest: HttpService) {}
}
