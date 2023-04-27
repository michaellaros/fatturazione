import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneratoreFatturaComponent } from './components/generatore-fattura/generatore-fattura.component';
import { StoricoFatturaComponent } from './components/storico-fattura/storico-fattura.component';

const routes: Routes = [
  { path: '', component: GeneratoreFatturaComponent },
  { path: 'storico', component: StoricoFatturaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
