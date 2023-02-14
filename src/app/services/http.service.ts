import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Ricevuta } from '../models/ricevuta';
import { FiltroRicevuta } from '../models/filtroRicevuta';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public urlAPI:string = "http://localhost:28181/api/";

  constructor(private http:HttpClient) { }

  GetDati(): Observable<string>{
    return this.http.get(this.urlAPI, { responseType: 'text' });
  }

  GetRicevuta(){
    return this.http.get<{ricevute:Ricevuta[]}>(this.urlAPI+"Ricevuta/DB/")
                  .pipe(catchError((error:HttpErrorResponse) => throwError(() =>new Error(error.message || "Server error!"))));
  }
  
  RicercaRicevuta(filtriRicevuta:any){
    return this.http.post<{ricevuteTrovate:string[]}>(this.urlAPI+"Ricevuta/",filtriRicevuta)
                  .pipe(catchError((error:HttpErrorResponse) => throwError(() =>new Error( error.message || "Server error!"))));
  }

  

}
