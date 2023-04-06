import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-modale-clienti',
  templateUrl: './modale-clienti.component.html',
  styleUrls: ['./modale-clienti.component.css'],
})
export class ModaleClientiComponent {
  clienti!: Cliente[];
  clienteSelezionato: Cliente | null = null;

  constructor(
    public dialogRef: MatDialogRef<ModaleClientiComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Cliente[]
  ) {
    this.clienti = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
