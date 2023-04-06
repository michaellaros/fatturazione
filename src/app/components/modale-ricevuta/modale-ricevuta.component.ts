import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RicevutaSelect } from 'src/app/models/ricevutaSelect';

@Component({
  selector: 'app-modale-ricevuta',
  templateUrl: './modale-ricevuta.component.html',
  styleUrls: ['./modale-ricevuta.component.css'],
})
export class ModaleRicevutaComponent {
  ricevute: RicevutaSelect[];
  ricevutaSelezionata: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ModaleRicevutaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RicevutaSelect[]
  ) {
    this.ricevute = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDataTransazione(nomeFile: string) {
    const data = nomeFile.split('_')[3].substring(0, 8);

    return (
      data.substring(6, 8) +
      '/' +
      data.substring(4, 6) +
      '/' +
      data.substring(0, 4)
    );
  }
}
