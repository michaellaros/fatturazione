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
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
