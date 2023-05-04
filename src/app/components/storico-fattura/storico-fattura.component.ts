import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FiltroStoricoRicevuta } from 'src/app/models/filtroStoricoRicevuta';
import { RicevutaStorico } from 'src/app/models/ricevutaStorico';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

export class CheckEmptyMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return (
      (form?.form.value['receipt_number'] == null ||
        form?.form.value['receipt_number'] == '') &&
      (form?.form.value['start'] == null || form?.form.value['start'] == '') &&
      (form?.form.value['end'] == null || form?.form.value['end'] == '') &&
      (isSubmitted! || (control != null && control.touched))
    );
  }
}

@Component({
  selector: 'app-storico-fattura',
  templateUrl: './storico-fattura.component.html',
  styleUrls: ['./storico-fattura.component.css'],
})
export class StoricoFatturaComponent {
  public form: FormGroup;
  public loading: boolean = false;
  public ricevuteStorico?: RicevutaStorico[] | null;
  public matcher = new CheckEmptyMatcher();
  public constructor(
    private httpclient: HttpService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private data: DataService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      receipt_number: new FormControl(),
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
  }

  public RicercaFattura() {
    if (this.form.valid) {
      var filtriRicevuta = new FiltroStoricoRicevuta();
      filtriRicevuta.receipt_number =
        this.form.get('receipt_number') != null
          ? this.form.get('receipt_number')!.value
          : '';

      if (this.form.get('start')?.value != null) {
        let dt = new Date(this.form.get('start')?.value);
        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
        filtriRicevuta.date_start = dt
          .toISOString()
          .split('T')[0]
          .replaceAll('-', '');
      } else {
        filtriRicevuta.date_start = '';
      }
      if (this.form.get('end')?.value != null) {
        let dt = new Date(this.form.get('end')?.value);
        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
        filtriRicevuta.date_end = dt
          .toISOString()
          .split('T')[0]
          .replaceAll('-', '');
      } else {
        filtriRicevuta.date_end = '';
      }

      this.loading = true;
      this.httpclient.RicercaFattura(filtriRicevuta).subscribe({
        next: (data) => {
          console.log(data);
          this.ricevuteStorico = data;
        },
        complete: () => (this.loading = false),
        error: () => (this.loading = false),
      });
    }
  }
  ClearFilter() {
    this.ricevuteStorico = null;
  }
}
