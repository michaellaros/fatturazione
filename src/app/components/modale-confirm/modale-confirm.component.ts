import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modale-confirm',
  templateUrl: './modale-confirm.component.html',
  styleUrls: ['./modale-confirm.component.css'],
})
export class ModaleConfirmComponent {
  @Input() public messaggio: string;

  public constructor(
    public dialogRef: MatDialogRef<ModaleConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data: string
  ) {
    this.messaggio = data;
  }
}
