import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FiltroClientiComponent } from './components/filtro-clienti/filtro-clienti.component';
import { FiltroRicevutaComponent } from './components/filtro-ricevuta/filtro-ricevuta.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { DetailListComponent } from './components/detail-list/detail-list.component';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModaleRicevutaComponent } from './components/modale-ricevuta/modale-ricevuta.component';
import { ModaleClientiComponent } from './components/modale-clienti/modale-clienti.component';
import { ModaleErroreComponent } from './components/modale-errore/modale-errore.component';


@NgModule({
  declarations: [
    AppComponent,
    FiltroClientiComponent,
    FiltroRicevutaComponent,
    DetailListComponent,
    ModaleRicevutaComponent,
    ModaleClientiComponent,
    ModaleErroreComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
