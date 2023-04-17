import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FiltroRicevuta } from 'src/app/models/filtroRicevuta';
import { RicevutaSelect } from 'src/app/models/ricevutaSelect';
import { HttpService } from 'src/app/services/http.service';
import { ModaleRicevutaComponent } from '../modale-ricevuta/modale-ricevuta.component';
import { Ricevuta } from 'src/app/models/ricevuta';

@Component({
  selector: 'app-filtro-ricevuta',
  templateUrl: './filtro-ricevuta.component.html',
  styleUrls: ['./filtro-ricevuta.component.css'],
})
export class FiltroRicevutaComponent {
  cassa!: string;
  public ricevutaSelezionata: string | null = null;
  public ricevuteTrovate: string[] = [];
  public form: FormGroup;
  public loading: boolean = false;
  @Output() public childEvent = new EventEmitter<string>();

  public constructor(
    private httpclient: HttpService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      negozio: new FormControl('', [Validators.required]),
      cassa: new FormControl('', [Validators.required]),
      transazione: new FormControl(),
      data: new FormControl('', [Validators.required]),
    });
  }

  RicercaRicevuta() {
    if (this.form.valid) {
      var filtriRicevuta = new FiltroRicevuta();
      filtriRicevuta.negozio = this.form.get('negozio')?.value;
      filtriRicevuta.cassa = this.form.get('cassa')?.value;
      filtriRicevuta.transazione = this.form.get('transazione')?.value;

      if (this.form.get('data')?.value != null) {
        var dt = new Date(this.form.get('data')?.value);
        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
        filtriRicevuta.data = dt;
      }
      console.log(filtriRicevuta);
      this.loading = true;
      this.httpclient.RicercaRicevuta(filtriRicevuta).subscribe({
        next: (data) => {
          this.openDialog(data.ricevute);
        },
        complete: () => (this.loading = false),
        error: () => (this.loading = false),
      });
    }
  }

  openDialog(ricevute: RicevutaSelect[]): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ModaleRicevutaComponent, {
      data: ricevute,
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result != null) {
        let nomeFileSplit = result.split('\\');
        nomeFileSplit = nomeFileSplit[nomeFileSplit.length - 1].split('_');
        this.form.patchValue({
          negozio: nomeFileSplit[0],
          cassa: nomeFileSplit[1],
          transazione: nomeFileSplit[2],
          data: new Date(
            nomeFileSplit[3].substring(6, 8) +
              '/' +
              nomeFileSplit[3].substring(4, 6) +
              '/' +
              nomeFileSplit[3].substring(0, 4)
          ),
        });
        this.childEvent.emit(result);
      }
    });
  }
}
