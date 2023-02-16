import { Component, Input} from '@angular/core';
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
  @Input() ricevuta! : Ricevuta;

  constructor(private httpTest: HttpService){

  }


}
