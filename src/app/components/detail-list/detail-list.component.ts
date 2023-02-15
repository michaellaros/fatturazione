import { Component, Input } from '@angular/core';
import { Ricevuta } from 'src/app/models/ricevuta';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.css']
})
export class DetailListComponent {
  displayedColumns: string[] = ['Codice', 'Descrizione', 'Prezzo', 'IVA'];
  ricevuta! : Ricevuta;
  @Input() fileName!:string;

  constructor(private httpTest: HttpService){

  }
  ngOnInit(){
    this.httpTest.GetRicevuta(this.fileName).subscribe((data)=>
    {
      this.ricevuta = data;
    console.log(data)});
      /*{
                          next: (data:IRicevuta[])=> this.ricevute = data ,
                          error: (error:string) => this.error = error});*/
}

}
