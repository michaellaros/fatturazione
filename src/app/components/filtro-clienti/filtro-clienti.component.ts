import { Component, EventEmitter, Output } from '@angular/core';
import { FiltroCliente } from 'src/app/models/filtroCliente';
import { HttpService } from 'src/app/services/http.service';
import { ModaleClientiComponent } from '../modale-clienti/modale-clienti.component';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { ModaleAddClientComponent } from '../modale-add-client/modale-add-client.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export class CheckEmptyMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return (
      (form?.form.value['business_name'] == null ||
        form?.form.value['business_name'] == '') &&
      (form?.form.value['cf_piva_passport'] == null ||
        form?.form.value['cf_piva_passport'] == '') &&
      (form?.form.value['surname'] == null ||
        form?.form.value['surname'] == '') &&
      (form?.form.value['name'] == null || form?.form.value['name'] == '') &&
      (form?.form.value['email'] == null || form?.form.value['email'] == '') &&
      (isSubmitted! || control!.touched)
    );
  }
}

@Component({
  selector: 'app-filtro-clienti',
  templateUrl: './filtro-clienti.component.html',
  styleUrls: ['./filtro-clienti.component.css'],
})
export class FiltroClientiComponent {
  public form: FormGroup;
  @Output() public childEvent = new EventEmitter<Cliente>();
  public client?: Cliente;
  public loading: boolean = false;
  public matcher = new CheckEmptyMatcher();

  constructor(
    private httpclient: HttpService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      business_name: new FormControl(),
      cf_piva_passport: new FormControl(),
      surname: new FormControl(),
      name: new FormControl(),
      email: new FormControl(),
    });
  }

  SetClient = (result: Cliente) => {
    if (result != null) {
      this.form.patchValue({
        business_name: result.business_name,
        cf_piva_passport:
          result.piva != null && result.piva != ''
            ? result.piva
            : result.cf != null && result.cf != ''
            ? result.cf
            : result.passport_number,
        surname: result.surname,
        name: result.name,
        email: result.email,
      });
      this.client = result;
      this.childEvent.emit(result);
    }
  };

  RicercaCliente() {
    if (this.IsEmpty()) {
      this.openSnackBar('Inserire almeno un campo!');
    } else if (this.form.valid && !this.IsEmpty()) {
      let filtroCliente = new FiltroCliente();
      filtroCliente.business_name = this.form.get('business_name')?.value;
      filtroCliente.cf_piva_passport = this.form.get('cf_piva_passport')?.value;
      filtroCliente.surname = this.form.get('surname')?.value;
      filtroCliente.name = this.form.get('name')?.value;
      filtroCliente.email = this.form.get('email')?.value;
      this.loading = true;
      this.httpclient.RicercaCliente(filtroCliente).subscribe({
        next: (data) => {
          this.openDialog(data.clienti);
        },
        complete: () => (this.loading = false),
        error: () => (this.loading = false),
      });
    }
  }

  openDialog(clienti: Cliente[]): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ModaleClientiComponent, {
      data: clienti,
    });
    dialogRef.afterClosed().subscribe(this.SetClient);
  }

  public AddClient() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ModaleAddClientComponent);
    dialogRef.afterClosed().subscribe((client: Cliente) => {
      this.SetClient(client);
      if (client != null)
        this.openSnackBar('Nuovo cliente inserito con successo!');
      else this.openSnackBar('Inserimento nuovo cliente annullato!');
    });
  }

  public EditClient() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ModaleAddClientComponent, {
      data: this.client,
    });
    dialogRef.afterClosed().subscribe((client: Cliente) => {
      this.SetClient(client);
      if (client != null)
        this.openSnackBar('Informazioni del cliente modificate con successo!');
      else this.openSnackBar('Modifiche informazione cliente annullate!');
    });
  }

  public DeselectClient() {
    this.client = undefined;
  }

  public IsEmpty() {
    return (
      (this.form.value['business_name'] == null ||
        this.form.value['business_name'] == '') &&
      (this.form.value['cf_piva_passport'] == null ||
        this.form.value['cf_piva_passport'] == '') &&
      (this.form.value['surname'] == null ||
        this.form.value['surname'] == '') &&
      (this.form.value['name'] == null || this.form.value['name'] == '') &&
      (this.form.value['email'] == null || this.form.value['email'] == '')
    );
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, 'conferma', {
      duration: 5 * 1000,
    });
  }
}
