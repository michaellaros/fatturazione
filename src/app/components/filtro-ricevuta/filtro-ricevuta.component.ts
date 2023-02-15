import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FiltroRicevuta } from 'src/app/models/filtroRicevuta';
import { HttpService } from 'src/app/services/http.service';
import { ModaleRicevutaComponent } from '../modale-ricevuta/modale-ricevuta.component';

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


  public constructor(private httpclient:HttpService,private fb:FormBuilder,private dialog: MatDialog)
  {
    this.form = this.fb.group({
      negozio: new FormControl(),
      cassa: new FormControl(),
      transazione: new FormControl(),
      data: new FormControl()
    });

  }

  RicercaRicevuta(form:any){
    console.log(JSON.stringify(form.value, null, 4));
    this.httpclient.RicercaRicevuta(form.value)
    .subscribe({
      next: (data) => {this.openDialog(data.ricevute); console.log(data.ricevute)},
      complete: () => console.info('complete') 
  });
  }

  openDialog(ricevute:string[]): void {
    this.dialog.open(ModaleRicevutaComponent, {data:ricevute
    });
  }

  
}
