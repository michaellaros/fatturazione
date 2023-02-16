import { Component } from '@angular/core';
import {FiltroCliente} from 'src/app/models/filtroCliente';
import { HttpService } from 'src/app/services/http.service';
import { ModaleClientiComponent } from '../filtro-clienti/modale-clienti/modale-clienti.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-filtro-clienti',
  templateUrl: './filtro-clienti.component.html',
  styleUrls: ['./filtro-clienti.component.css']
})
export class FiltroClientiComponent {
  filtroCliente!: FiltroCliente;
  cliente!:Cliente;
  public form:FormGroup;

constructor(private httpclient:HttpService,private fb:FormBuilder,private dialog: MatDialog){
              this.form = this.fb.group({
                clientSurname: new FormControl(),
                clientName: new FormControl(),
                birthDate: new FormControl(),
                clientAdress: new FormControl()
              });

}
RicercaCliente(form:any){
  console.log(JSON.stringify(form.value, null, 4));
  this.httpclient.RicercaCliente(form.value)
  .subscribe({
    next: (data) => {this.openDialog(data.clienti);console.log(data)},
    complete: () => console.info('complete')
});
}

openDialog(clienti:Cliente[]): void {
  const dialogRef = this.dialog.open(ModaleClientiComponent, {data:clienti
  });
  dialogRef.afterClosed().subscribe(result => {
    this.cliente = result;
  });

}
saveDetails(form:any) {
 alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
  }

}


