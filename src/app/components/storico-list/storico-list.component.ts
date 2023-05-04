import { Component, Input } from '@angular/core';
import { RicevutaStorico } from 'src/app/models/ricevutaStorico';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-storico-list',
  templateUrl: './storico-list.component.html',
  styleUrls: ['./storico-list.component.css'],
})
export class StoricoListComponent {
  @Input() ricevuteStorico!: RicevutaStorico[];
  displayedColumns: string[] = [
    'index',
    'receipt_number',
    'year',
    'store_id',
    'receipt_type',
    'date',
    'actions',
  ];
  constructor(private http: HttpService) {}

  GetExistingPDF(ricevuta: RicevutaStorico) {
    console.log(
      JSON.stringify(ricevuta.date!).split('T')[0].replaceAll('-', '')
    );
    this.http.GetExistingPDF(
      ricevuta.store_id!,
      ricevuta.receipt_year!,
      ricevuta.receipt_number!,
      JSON.stringify(ricevuta.date!)
        .split('T')[0]
        .replaceAll('-', '')
        .replaceAll('"', '')
    );
  }

  GetCreditNotes(ricevuta: RicevutaStorico) {
    console.log(
      JSON.stringify(ricevuta.date!).split('T')[0].replaceAll('-', '')
    );
    this.http.GetCreditNotes(
      ricevuta.store_id!,
      ricevuta.receipt_year!,
      ricevuta.receipt_number!,
      JSON.stringify(ricevuta.date!)
        .split('T')[0]
        .replaceAll('-', '')
        .replaceAll('"', '')
    );
  }
}
