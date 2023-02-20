import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
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
  public ricevuteTrovate:string[] = [];
  public form:FormGroup;
  @Output() public childEvent = new EventEmitter<string>();


  public constructor(private httpclient:HttpService,private fb:FormBuilder,private dialog: MatDialog)
  {
    this.form = this.fb.group({
      negozio: new FormControl('', [Validators.required]),
      cassa: new FormControl('', [Validators.required]),
      transazione: new FormControl(),
      data: new FormControl('', [Validators.required])
    });

  }

  RicercaRicevuta(){

    if(this.form.valid){
      var filtriRicevuta = new FiltroRicevuta();
      filtriRicevuta.negozio = this.form.get("negozio")?.value;
      filtriRicevuta.cassa = this.form.get("cassa")?.value;
      filtriRicevuta.transazione = this.form.get("transazione")?.value;
      filtriRicevuta.data = this.form.get("data")?.value.setHours(this.form.get("data")?.value + 1);
      console.log(filtriRicevuta)
      this.httpclient.RicercaRicevuta(filtriRicevuta)
    .subscribe({
      next: (data) => {this.openDialog(data.ricevute)},
      complete: () => console.info('complete')
  });
    }

  }

  openDialog(ricevute:string[]): void {
    const dialogRef = this.dialog.open(ModaleRicevutaComponent, {data:ricevute
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: '+result);
      if(result != null)
      this.childEvent.emit(result);

    });
  }


}
