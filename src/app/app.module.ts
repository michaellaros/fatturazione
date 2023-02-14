import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FiltroClientiComponent } from './components/filtro-clienti/filtro-clienti.component';
import { FiltroRicevutaComponent } from './components/filtro-ricevuta/filtro-ricevuta.component';
import { FormsModule } from '@angular/forms';
import { DetailListComponent } from './components/detail-list/detail-list.component';
import { HttpTestService } from './services/http-test.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FiltroClientiComponent,
    FiltroRicevutaComponent,
    DetailListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpTestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
