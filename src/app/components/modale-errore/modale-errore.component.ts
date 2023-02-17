import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modale-errore',
  templateUrl: './modale-errore.component.html',
  styleUrls: ['./modale-errore.component.css']
})
export class ModaleErroreComponent {

  errore:HttpErrorResponse;

  constructor(public dialogRef: MatDialogRef<ModaleErroreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HttpErrorResponse){
      this.errore = data;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
