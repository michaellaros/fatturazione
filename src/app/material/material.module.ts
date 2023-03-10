import { NgModule } from '@angular/core';


import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';



const MaterialComponents = [
  MatButtonModule
  ,MatFormFieldModule
  ,MatDatepickerModule
  ,MatNativeDateModule
  ,MatInputModule
  ,MatTableModule
  ,MatIconModule
  ,MatListModule
  ,MatToolbarModule
  ,MatDialogModule
];

@NgModule({
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
