import { Component } from '@angular/core';
import {FiltroCliente} from 'src/app/models/filtroCliente';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-filtro-clienti',
  templateUrl: './filtro-clienti.component.html',
  styleUrls: ['./filtro-clienti.component.css']
})
export class FiltroClientiComponent {

filtroCliente!: FiltroCliente;

constructor(private httpTest: HttpService){

}


ngOnInit(){

}

saveDetails(form: any) {
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
}
}
