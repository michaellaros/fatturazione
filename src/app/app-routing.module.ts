import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { GeneratoreFatturaComponent } from './components/generatore-fattura/generatore-fattura.component';
import { StoricoFatturaComponent } from './components/storico-fattura/storico-fattura.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },

  {
    path: 'Home',
    component: GeneratoreFatturaComponent,
  },

  {
    path: 'Storico',
    component: StoricoFatturaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
