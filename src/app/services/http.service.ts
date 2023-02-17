import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Ricevuta } from '../models/ricevuta';
import { Cliente } from '../models/cliente';
import { MatDialog } from '@angular/material/dialog';
import { ModaleErroreComponent } from '../components/modale-errore/modale-errore.component';




@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public urlAPI:string = "http://localhost:56209/api/";

  constructor(private http:HttpClient, private dialog: MatDialog) { }

  GetDati(): Observable<string>{
    return this.http.get(this.urlAPI, { responseType: 'text' });
  }

  GetRicevute(){
    return this.http.get<{ricevute:Ricevuta[]}>(this.urlAPI+"Ricevuta/DB/")
                  .pipe(catchError((error:HttpErrorResponse) => this.ErrorHandler(error)))
  }
  GetRicevuta(fileName:string){
    return this.http.post<Ricevuta>(this.urlAPI+"Ricevuta/GetRicevuta",{fileName})
                  .pipe(catchError((error:HttpErrorResponse) => this.ErrorHandler(error)))
  }
  RicercaCliente(filtriCliente:any){
    return this.http.post<{clienti:Cliente[]}>(this.urlAPI+"Cliente/",filtriCliente)
                  .pipe(catchError((error:HttpErrorResponse) => this.ErrorHandler(error)))
  }

  RicercaRicevuta(filtriRicevuta:any){
    return this.http.post<{ricevute:string[]}>(this.urlAPI+"Ricevuta/",filtriRicevuta)
                  .pipe(catchError((error:HttpErrorResponse) => this.ErrorHandler(error)))
  }

  SendPDF(ricevuta:Ricevuta, cliente:Cliente){
    return this.http.post(this.urlAPI+"PDF/SendPDF",{cliente,ricevuta},{responseType: 'blob' as 'json'})
                  .pipe(catchError((error:HttpErrorResponse) => this.ErrorHandler(error)))
                  .subscribe(data => this.DownloadPDF(data))
          
  }

  getPDF(){
    return this.http.get(this.urlAPI+"PDF",{responseType: 'blob' as 'json'})
                  .pipe(catchError((error:HttpErrorResponse) => this.ErrorHandler(error)))
                  .subscribe(data => this.DownloadPDF(data))
          
  }

  ErrorHandler(error:HttpErrorResponse)
  {
    const dialogRef = this.dialog.open(ModaleErroreComponent, {data:error
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: '+result);
    });


    return throwError(() =>new Error( error.message || "Server error!"));

  }

  DownloadPDF(data:any) {

    let blob = new Blob([data], {type: 'application/pdf'});
  
    var downloadURL = window.URL.createObjectURL(data);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = "help.pdf";
    link.click();
  
  }
  


}
