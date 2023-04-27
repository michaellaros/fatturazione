import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-storico-fattura',
  templateUrl: './storico-fattura.component.html',
  styleUrls: ['./storico-fattura.component.css'],
})
export class StoricoFatturaComponent {
  public form: FormGroup;
  public loading: boolean = false;
  public constructor(
    private httpclient: HttpService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      receipt_number: new FormControl(),
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
  }
}
