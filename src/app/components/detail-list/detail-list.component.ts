import { Component, Input } from '@angular/core';
import { Ricevuta } from 'src/app/models/ricevuta';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.css']
})
export class DetailListComponent {
  columnsRicevuta: string[] = ["Codice", "Descrizione", "Prezzo", "IVA"];
  columnsIVA: string[] = ["Codice", "Prezzo"];
  ricevuta! : Ricevuta;
  @Input() fileName!:string;

  constructor(private httpTest: HttpService){

  }
  ngOnInit(){
    this.httpTest.GetRicevuta(this.fileName).subscribe((data)=>
    {
      this.ricevuta = data;
    console.log(data)});

}

}
