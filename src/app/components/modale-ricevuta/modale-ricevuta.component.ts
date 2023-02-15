import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modale-ricevuta',
  templateUrl: './modale-ricevuta.component.html',
  styleUrls: ['./modale-ricevuta.component.css']
})
export class ModaleRicevutaComponent {

  ricevute:string[];

  constructor(public dialogRef: MatDialogRef<ModaleRicevutaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]){
      this.ricevute = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
