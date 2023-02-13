import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { IRicevuta } from '../models/ricevuta';



@Injectable({
  providedIn: 'root'
})
export class HttpTestService {

  public urlAPI:string = "http://localhost:28181/api/Ricevuta/DB/";

  constructor(private http:HttpClient) { }

  GetDati(): Observable<string>{
    return this.http.get(this.urlAPI, { responseType: 'text' });
  }

  GetRicevuta(){
    return this.http.get<{ricevute:IRicevuta[]}>(this.urlAPI).pipe(catchError((error:HttpErrorResponse) => throwError(() =>new Error(error.message || "Server error!"))));
  }
  
}
