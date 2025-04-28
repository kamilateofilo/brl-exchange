import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ExchangeFormComponent } from '../../components/exchange-form/exchange-form.component';
import { ExchangeResultComponent } from '../../components/exchange-result/exchange-result.component';

@Component({
  selector: 'app-exchange-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ExchangeFormComponent,
    ExchangeResultComponent,
  ],
  templateUrl: './exchange-home.component.html',
  styleUrls: ['./exchange-home.component.scss']
})
export class ExchangeHomeComponent {
  selectedCode = '';
  exchangeRate: number | null = null;
  date = '';
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  handleSearch(code: string) {
    const formatted = code.trim().toUpperCase();
    if (!formatted) return;

    this.selectedCode = formatted;
    this.exchangeRate = null;
    this.date = '';
    this.loading = true;
    this.error = '';

    const latestUrl = `http://localhost:3000/latest`;

    this.http.get<any>(latestUrl).subscribe({
      next: (res) => {
        if (res?.rates?.[formatted]) {
          this.exchangeRate = res.rates[formatted];
          this.date = res.date;
        } else {
          this.error = 'Cotação não encontrada';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao buscar cotação';
        this.loading = false;
      }
    });
  }
}
