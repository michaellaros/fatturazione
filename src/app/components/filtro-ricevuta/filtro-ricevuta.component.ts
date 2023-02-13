import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filtro-ricevuta',
  templateUrl: './filtro-ricevuta.component.html',
  styleUrls: ['./filtro-ricevuta.component.css']
})
export class FiltroRicevutaComponent {
   cassa!: string;
   form: FormGroup = new FormGroup({});
   public constructor(private fb: FormBuilder){}

   ngInit(){
    this.form = this.fb.group({
      negozio: [null],
      cassa: [null],
      dob: [null],
      address: [null],
      country: [null],
      gender: [null]
    });
   }

  saveDetails(form: any) {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
  }
}
