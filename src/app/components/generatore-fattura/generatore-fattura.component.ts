import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { infoRicevuta } from 'src/app/models/infoRicevuta';
import { Ricevuta } from 'src/app/models/ricevuta';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { ModaleRicevutaComponent } from '../modale-ricevuta/modale-ricevuta.component';
import { ModaleFatturaCreataComponent } from '../modale-fattura-creata/modale-fattura-creata.component';

@Component({
  selector: 'app-generatore-fattura',
  templateUrl: './generatore-fattura.component.html',
  styleUrls: ['./generatore-fattura.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('150ms ease-out')),
      transition('default => rotated', animate('150ms ease-in')),
    ]),
  ],
})
export class GeneratoreFatturaComponent {
  public ricevutaSelezionata: string | null = null;
  public ricevuta!: Ricevuta | null;
  public clienteSelezionato: string | null = null;
  public cliente!: Cliente;
  public store_id?: number;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private data: DataService,
    private dialog: MatDialog
  ) {}

  state: string = 'default';
  rotate() {
    this.state = this.state === 'default' ? 'rotated' : 'default';
  }

  toDisplay = true;

  toggleData() {
    this.toDisplay = !this.toDisplay;
  }

  SendPDF() {
    this.http
      .SendPDF(this.ricevuta!.nome_ricevuta, this.cliente)
      .subscribe((info) => {
        this.openDialog(info);
      });
  }

  openDialog(info: infoRicevuta): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ModaleFatturaCreataComponent, {
      data: { info: info, flg_isFattura: true },
    });
    dialogRef.afterClosed().subscribe(() => (this.ricevuta = null));
  }

  SetRicevuta(filename: string) {
    this.http.GetRicevuta(filename).subscribe((data) => {
      this.ricevuta = data;
    });
  }
}
