import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExchangeRoutingModule } from './exchange-routing.module';

import { ExchangeHomeComponent } from './pages/exchange-home/exchange-home.component';
import { ExchangeFormComponent } from './components/exchange-form/exchange-form.component';

@NgModule({
  declarations: [
    ExchangeHomeComponent,
    ExchangeFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ExchangeRoutingModule
  ]
})
export class ExchangeModule {}
