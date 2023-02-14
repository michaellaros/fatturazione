import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filtro-ricevuta',
  templateUrl: './filtro-ricevuta.component.html',
  styleUrls: ['./filtro-ricevuta.component.css']
})
export class FiltroRicevutaComponent {
   cassa!: string;
   public constructor(){}



  saveDetails(form: any) {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
  }
}
