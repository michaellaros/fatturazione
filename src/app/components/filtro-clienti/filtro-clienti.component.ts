import { Component, EventEmitter, Output } from '@angular/core';
import { FiltroCliente } from 'src/app/models/filtroCliente';
import { HttpService } from 'src/app/services/http.service';
import { ModaleClientiComponent } from '../modale-clienti/modale-clienti.component';
import { MatDialog } from '@angular/material/dialog';
import {
  CheckboxRequiredValidator,
  FormBuilder,
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-filtro-clienti',
  templateUrl: './filtro-clienti.component.html',
  styleUrls: ['./filtro-clienti.component.css'],
})
export class FiltroClientiComponent {
  public form: FormGroup;
  @Output() public childEvent = new EventEmitter<Cliente>();

  constructor(
    private httpclient: HttpService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      surname: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      cf_piva: new FormControl(),
      email: new FormControl(),
      birthday: new FormControl(),
      address: new FormControl(),
    });
  }
  RicercaCliente() {
    if (this.form.valid) {
      var filtroCliente = new FiltroCliente();
      filtroCliente.clientSurname = this.form.get('clientSurname')?.value;
      filtroCliente.clientName = this.form.get('clientName')?.value;
      filtroCliente.clientAddress = this.form.get('clientAddress')
        ? this.form.get('clientAddress')?.value
        : '';
      if (this.form.get('birthDate')?.value != null) {
        var dt = new Date(this.form.get('birthDate')?.value);
        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
        console.log(dt);
        filtroCliente.birthDate = dt;
      }

      console.log(filtroCliente);
      this.httpclient.RicercaCliente(filtroCliente).subscribe({
        next: (data) => {
          this.openDialog(data.clienti);
        },
        complete: () => console.info('complete'),
      });
    }
  }

  openDialog(clienti: Cliente[]): void {
    const dialogRef = this.dialog.open(ModaleClientiComponent, {
      data: clienti,
    });
    dialogRef.afterClosed().subscribe((result: Cliente) => {
      this.form.patchValue({
        surname: result.surname,
        name: result.name,
        cf_piva: result.cf_piva,
        email: result.email,
        birthday: new Date(result.birthday!),
        address: result.address,
      });

      this.childEvent.emit(result);
    });
  }
}
