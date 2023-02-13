import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filtro-ricevuta',
  templateUrl: './filtro-ricevuta.component.html',
  styleUrls: ['./filtro-ricevuta.component.css']
})
export class FiltroRicevutaComponent {
   cassa!: string;
  /*
   public constructor(private fb: FormBuilder){}

   ngInit(){
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(10)]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      dob: [null, [Validators.required]],
      address: [null],
      country: [null],
      gender: [null]
    });
   }*/
}
