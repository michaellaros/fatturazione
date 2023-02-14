import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Ricevuta } from '../models/ricevuta';
import { FiltroRicevuta } from '../models/filtroRicevuta';



@Injectable({
  providedIn: 'root'
})
export class HttpTestService {

  public urlAPI:string = "http://localhost:28181/api/";

  constructor(private http:HttpClient) { }

  GetDati(): Observable<string>{
    return this.http.get(this.urlAPI, { responseType: 'text' });
  }

  GetRicevuta(){
    return this.http.get<{ricevute:Ricevuta[]}>(this.urlAPI+"Ricevuta/DB/")
                  .pipe(catchError((error:HttpErrorResponse) => throwError(() =>new Error(error.message || "Server error!"))));
  }
  
  CercaRicevuta(filtriRicevuta:FiltroRicevuta){
    return this.http.post<FiltroRicevuta>(this.urlAPI+"Ricevuta/CercaRicevuta/",filtriRicevuta)
                  .pipe(catchError((error:HttpErrorResponse) => throwError(() =>new Error(error.message || "Server error!"))));
  }

}
