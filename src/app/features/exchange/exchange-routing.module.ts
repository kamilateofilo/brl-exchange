import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeHomeComponent } from './pages/exchange-home/exchange-home.component';

const routes: Routes = [
  { path: '', component: ExchangeHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRoutingModule {}
