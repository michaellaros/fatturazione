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
      business_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      cf_piva: new FormControl(),
      surname: new FormControl(),
      name: new FormControl(),

      email: new FormControl(),
      // birthday: new FormControl(),
      // address: new FormControl(),
    });
  }
  RicercaCliente() {
    if (this.form.valid) {
      let filtroCliente = new FiltroCliente();
      filtroCliente.business_name = this.form.get('business_name')?.value;
      filtroCliente.cf_piva = this.form.get('cf_piva')?.value;
      filtroCliente.surname = this.form.get('surname')?.value;
      filtroCliente.name = this.form.get('name')?.value;
      filtroCliente.email = this.form.get('email')?.value;
      // filtroCliente.address = this.form.get('clientAddress');

      // if (this.form.get('birthDate')?.value != null) {
      //   var dt = new Date(this.form.get('birthDate')?.value);
      //   dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
      //   console.log(dt);
      //   filtroCliente.birthDate = dt;
      // }

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
        business_name: result.business_name,
        cf_piva: result.cf_piva,
        surname: result.surname,
        name: result.name,
        email: result.email,
      });

      this.childEvent.emit(result);
    });
  }
}
