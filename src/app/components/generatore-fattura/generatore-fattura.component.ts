import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Ricevuta } from 'src/app/models/ricevuta';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

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
  public ricevuta!: Ricevuta;
  public clienteSelezionato: string | null = null;
  public cliente!: Cliente;
  public store_id?: number;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private data: DataService
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
    console.log(this.ricevuta, this.cliente);
    this.http.SendPDF(this.ricevuta.nome_ricevuta, this.cliente);
  }

  SetRicevuta(filename: string) {
    this.http.GetRicevuta(filename).subscribe((data) => {
      this.ricevuta = data;
      console.log(data, 'ciao');
    });
  }
}
