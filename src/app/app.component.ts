import { Component } from '@angular/core';
import { Cliente } from './models/cliente';
import { Ricevuta } from './models/ricevuta';
import { HttpService } from './services/http.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
export class AppComponent {
  public ricevutaSelezionata: string | null = null;
  public ricevuta!: Ricevuta;
  public clienteSelezionato: string | null = null;
  public cliente!: Cliente;

  constructor(private http: HttpService) {}

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
