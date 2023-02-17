import { Component } from '@angular/core';
import { Cliente } from './models/cliente';
import { Ricevuta } from './models/ricevuta';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public ricevutaSelezionata:string|null = null;
  public ricevuta!:Ricevuta;
  public clienteSelezionato:string|null = null;
  public cliente!:Cliente;

constructor(private http:HttpService){

}

  SendPDF(){
    this.http.getPDF();

  }

  SetRicevuta(filename:string ){
    this.http.GetRicevuta(filename).subscribe((data)=>
    {
      this.ricevuta = data;
    console.log(data,"ciao")});

  }
  openDialog(error:any): void {
  }
}


