import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModaleErroreComponent } from '../modale-errore/modale-errore.component';
import { infoRicevuta } from 'src/app/models/infoRicevuta';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-modale-fattura-creata',
  templateUrl: './modale-fattura-creata.component.html',
  styleUrls: ['./modale-fattura-creata.component.css'],
})
export class ModaleFatturaCreataComponent {
  public info: infoRicevuta;
  public flg_isFattura: boolean;
  constructor(
    public dialogRef: MatDialogRef<ModaleErroreComponent>,
    private http: HttpService,
    @Inject(MAT_DIALOG_DATA)
    data: { info: infoRicevuta; flg_isFattura: boolean }
  ) {
    this.info = data.info;
    this.flg_isFattura = data.flg_isFattura;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ScaricaPDF() {
    this.http.GetExistingPDF(this.info);
  }
}
