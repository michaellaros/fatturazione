import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FiltroRicevuta } from 'src/app/models/filtroRicevuta';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-filtro-ricevuta',
  templateUrl: './filtro-ricevuta.component.html',
  styleUrls: ['./filtro-ricevuta.component.css']
})
export class FiltroRicevutaComponent {
  cassa!: string;
  public ricevutaSelezionata:string|null = null;
  public ricevuteTrovate:string[]|null = null;
  public form:FormGroup;


  public constructor(private httpclient:HttpService,private fb:FormBuilder)
  {
    this.form = this.fb.group({
      negozio: new FormControl(),
      cassa: new FormControl(),
      transazione: new FormControl(),
      data: new FormControl()
    });

  }

  ngInit(){
    
  }

  RicercaRicevuta(form:any){
    console.log(JSON.stringify(form.value, null, 4));
    this.httpclient.RicercaRicevuta(form.value)
    .subscribe({
      next: (data) => {this.ricevuteTrovate = data.ricevuteTrovate; console.log(data)},
      complete: () => console.info('complete') 
  });
  }

  
}
