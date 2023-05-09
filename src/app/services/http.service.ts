import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ricevuta } from '../models/ricevuta';
import { Cliente } from '../models/cliente';
import { MatDialog } from '@angular/material/dialog';
import { ModaleErroreComponent } from '../components/modale-errore/modale-errore.component';
import { FiltroCliente } from '../models/filtroCliente';
import { RicevutaSelect } from '../models/ricevutaSelect';
import { FiltroStoricoRicevuta } from '../models/filtroStoricoRicevuta';
import { RicevutaStorico } from '../models/ricevutaStorico';
import { infoRicevuta } from '../models/infoRicevuta';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  urlAPI: string;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.urlAPI = baseUrl + '/';
  }

  GetDati(): Observable<string> {
    return this.http.get(this.urlAPI, { responseType: 'text' });
  }

  GetRicevute() {
    return this.http
      .get<{ ricevute: Ricevuta[] }>(this.urlAPI + 'Ricevuta/DB/')
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  GetRicevuta(fileName: string) {
    return this.http
      .post<Ricevuta>(this.urlAPI + 'Ricevuta/GetRicevuta', { fileName })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  RicercaCliente(filtriCliente: FiltroCliente) {
    return this.http
      .post<{ clienti: Cliente[] }>(
        this.urlAPI + 'Cliente/Search',
        filtriCliente
      )
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  InsertClient(client: Cliente) {
    return this.http
      .post<Cliente>(this.urlAPI + 'Cliente/Insert', client)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  UpdateClient(client: Cliente) {
    return this.http
      .post<Cliente>(this.urlAPI + 'Cliente/Update', client)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  RicercaRicevuta(filtriRicevuta: any) {
    return this.http
      .post<{ ricevute: RicevutaSelect[] }>(
        this.urlAPI + 'Ricevuta/',
        filtriRicevuta
      )
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  SendPDF(receiptName: string, cliente: Cliente) {
    return this.http
      .post<infoRicevuta>(this.urlAPI + 'PDF/SendPDF', {
        client_id: cliente.id,
        receiptName,
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
    // .subscribe((data) =>
    //   this.DownloadPDF(data, cliente.business_name + receiptName)
    // );
  }

  ErrorHandler(error: HttpErrorResponse) {
    const dialogRef = this.dialog.open(ModaleErroreComponent, { data: error });

    return throwError(() => new Error(error.message || 'Server error!'));
  }

  DownloadPDF(data: any, fileName: string) {
    let blob = new Blob([data], { type: 'application/pdf' });

    var downloadURL = window.URL.createObjectURL(data);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = fileName + '.pdf';
    link.click();
  }

  RicercaFattura(filtro: FiltroStoricoRicevuta) {
    return this.http
      .post<RicevutaStorico[]>(this.urlAPI + 'Ricevuta/Storico', filtro)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  GetExistingPDF(info: infoRicevuta) {
    return this.http
      .post(this.urlAPI + 'PDF/GetExistingPDF', info, {
        responseType: 'blob' as 'json',
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)))
      .subscribe((data) =>
        this.DownloadPDF(data, info.receipt_number + '_' + info.store_id)
      );
  }

  GetCreditNotes(
    store_id: string,
    receipt_year: string,
    receipt_number: string,
    date: string
  ) {
    return this.http
      .post<infoRicevuta>(this.urlAPI + 'PDF/GetCreditNotes', {
        store_id: store_id,
        receipt_year: receipt_year,
        receipt_number: receipt_number,
        date: date,
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
    // .subscribe((data) =>
    //   this.DownloadPDF(data, 'storno_' + receipt_number + '_' + store_id)
    // );
  }
}
