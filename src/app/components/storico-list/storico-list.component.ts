import { Component, EventEmitter, Input, Output } from '@angular/core';
import { infoRicevuta } from 'src/app/models/infoRicevuta';
import { RicevutaStorico } from 'src/app/models/ricevutaStorico';
import { HttpService } from 'src/app/services/http.service';
import { ModaleFatturaCreataComponent } from '../modale-fattura-creata/modale-fattura-creata.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { ModaleConfirmComponent } from '../modale-confirm/modale-confirm.component';

@Component({
  selector: 'app-storico-list',
  templateUrl: './storico-list.component.html',
  styleUrls: ['./storico-list.component.css'],
})
export class StoricoListComponent {
  @Output() public childEvent = new EventEmitter<string>();
  @Input() ricevuteStorico!: RicevutaStorico[];

  public loading = false;

  displayedColumns: string[] = [
    'index',
    'receipt_number',
    'receipt_type',
    'storno_number',
    'date',
    'actions',
  ];
  constructor(private http: HttpService, private dialog: MatDialog) {}

  GetExistingPDF(ricevuta: RicevutaStorico) {
    this.http.GetExistingPDF(
      new infoRicevuta(
        ricevuta.store_id!,
        ricevuta.receipt_year!,
        ricevuta.receipt_number!,
        JSON.stringify(ricevuta.date!)
          .split('T')[0]
          .replaceAll('-', '')
          .replaceAll('"', '')
      )
    );
  }

  GetCreditNotes(ricevuta: RicevutaStorico) {
    this.loading = true;
    const dialogRef = this.dialog.open(ModaleConfirmComponent, {
      data: 'Sei sicuro di voler stornare questa fattura?',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.http
          .GetCreditNotes(
            ricevuta.store_id!,
            ricevuta.receipt_year!,
            ricevuta.receipt_number!,
            JSON.stringify(ricevuta.date!)
              .split('T')[0]
              .replaceAll('-', '')
              .replaceAll('"', '')
          )
          .subscribe((info) => {
            this.openDialog(info);
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    });
  }

  openDialog(info: infoRicevuta): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ModaleFatturaCreataComponent, {
      data: { info: info, flg_isFattura: false },
    });
    dialogRef.afterClosed().subscribe(() => this.childEvent.emit());
  }

  formatDate(data: string) {
    let dataSplit = data.split('-');
    return dataSplit[2] + '/' + dataSplit[1] + '/' + dataSplit[0];
  }
  // disableButton(button: MatButton) {
  //   setTimeout(() => {
  //     button.disabled = false;
  //   }, 5000);
  // }

  ConfirmStorno() {}
}
