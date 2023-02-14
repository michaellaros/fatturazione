import { Component } from '@angular/core';
import {FiltroCliente} from 'src/app/models/filtroCliente';
import { HttpTestService } from 'src/app/services/http-test.service';

@Component({
  selector: 'app-filtro-clienti',
  templateUrl: './filtro-clienti.component.html',
  styleUrls: ['./filtro-clienti.component.css']
})
export class FiltroClientiComponent {

filtroCliente!: FiltroCliente;

constructor(private httpTest: HttpTestService){

}


ngOnInit(){

}

saveDetails(form: any) {
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
}
}
