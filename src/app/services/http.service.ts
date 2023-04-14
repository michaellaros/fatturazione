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
      .post<{ clienti: Cliente[] }>(this.urlAPI + 'Cliente/', filtriCliente)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  RicercaRicevuta(filtriRicevuta: any) {
    console.log(filtriRicevuta);
    return this.http
      .post<{ ricevute: RicevutaSelect[] }>(
        this.urlAPI + 'Ricevuta/',
        filtriRicevuta
      )
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  SendPDF(receiptName: string, cliente: Cliente) {
    return this.http
      .post(
        this.urlAPI + 'PDF/SendPDF',
        { client_id: cliente.id, receiptName },
        { responseType: 'blob' as 'json' }
      )
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)))
      .subscribe((data) =>
        this.DownloadPDF(data, cliente.business_name + receiptName)
      );
  }

  getPDF() {
    return this.http
      .get(this.urlAPI + 'PDF', { responseType: 'blob' as 'json' })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)))
      .subscribe((data) => this.DownloadPDF(data, 'file'));
  }

  ErrorHandler(error: HttpErrorResponse) {
    const dialogRef = this.dialog.open(ModaleErroreComponent, { data: error });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed: ' + result);
    });

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
}
