import { Component,EventEmitter,Output } from '@angular/core';
import {FiltroCliente} from 'src/app/models/filtroCliente';
import { HttpService } from 'src/app/services/http.service';
import { ModaleClientiComponent } from '../modale-clienti/modale-clienti.component';
import { MatDialog } from '@angular/material/dialog';
import { CheckboxRequiredValidator, FormBuilder, FormControl, FormGroup, RequiredValidator } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-filtro-clienti',
  templateUrl: './filtro-clienti.component.html',
  styleUrls: ['./filtro-clienti.component.css']
})
export class FiltroClientiComponent {

  cliente!:Cliente;
  public form:FormGroup;
  @Output() public childEvent = new EventEmitter<Cliente>();

constructor(private httpclient:HttpService,private fb:FormBuilder,private dialog: MatDialog){
              this.form = this.fb.group({
                clientSurname: new FormControl(),
                clientName: new FormControl(),
                birthDate: new FormControl(),
                clientAdress: new FormControl()
              });

}
RicercaCliente(){
  if(this.form.valid){
    var filtroCliente = new FiltroCliente();
    
    filtroCliente.clientSurname = this.form.get("clientSurname")?.value;
    filtroCliente.clientName = this.form.get("clientName")?.value;
    filtroCliente.clientAddress = this.form.get("clientAddress")?.value;
    filtroCliente.birthDate = this.form.get("birthDate")?.value.setHours(this.form.get("birthDate")?.value + 1);
    
    console.log(filtroCliente);
    this.httpclient.RicercaCliente(filtroCliente)
    .subscribe({
      next: (data) => {this.openDialog(data.clienti)},
      complete: () => console.info('complete')
  });
  }
}

openDialog(clienti:Cliente[]): void {
  const dialogRef = this.dialog.open(ModaleClientiComponent, {data:clienti
  });
  dialogRef.afterClosed().subscribe(result => {
    this.cliente = result;
    this.childEvent.emit(result);
  });

}
}


