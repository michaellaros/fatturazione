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

  public urlAPI:string = "http://localhost:56209/api/";

  constructor(private http:HttpClient) { }

  GetDati(): Observable<string>{
    return this.http.get(this.urlAPI, { responseType: 'text' });
  }

  GetRicevute(){
    return this.http.get<{ricevute:Ricevuta[]}>(this.urlAPI+"Ricevuta/DB/")
                  .pipe(catchError((error:HttpErrorResponse) => throwError(() =>new Error(error.message || "Server error!"))));
  }
  GetRicevuta(fileName:string){
    console.log(this.urlAPI+"Ricevuta/"+fileName);
    return this.http.get<Ricevuta>(this.urlAPI+"Ricevuta/"+fileName)
                  .pipe(catchError((error:HttpErrorResponse) => throwError(() =>new Error(error.message || "Server error!"))));
  }
  
  RicercaRicevuta(filtriRicevuta:any){
    return this.http.post<{ricevute:string[]}>(this.urlAPI+"Ricevuta/",filtriRicevuta)
                  .pipe(catchError((error:HttpErrorResponse) => throwError(() =>new Error( error.message || "Server error!"))));
  }

  

}
