import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ExchangeFormComponent } from '../../components/exchange-form/exchange-form.component';
import { ExchangeResultComponent } from '../../components/exchange-result/exchange-result.component';
import { ExchangeHistoryComponent } from '../../components/exchange-history/exchange-history.component';

@Component({
  selector: 'app-exchange-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ExchangeFormComponent,
    ExchangeResultComponent,
    ExchangeHistoryComponent,
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
  showHistory = false;
  historyData: { date: string; close: number }[] = [];

  constructor(private http: HttpClient) {}

  toggleHistory() {
    this.showHistory = !this.showHistory;
  }

  get toggleIcon(): string {
    return this.showHistory ? '−' : '+';
  }

  get toggleText(): string {
    return 'LAST 30 DAYS';
  }

  handleSearch(code: string) {
    const formatted = code.trim().toUpperCase();
    if (!formatted) return;

    this.selectedCode = formatted;
    this.exchangeRate = null;
    this.date = '';
    this.loading = true;
    this.error = '';
    this.showHistory = false;

    const latestUrl = `http://localhost:3000/latest`;
    const historyUrl = `http://localhost:3000/timeseries`;

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

    this.http.get<any[]>(historyUrl).subscribe({
      next: (res) => {
        this.historyData = res;
      },
      error: () => {
        console.warn('Histórico não carregado');
        this.historyData = [];
      }
    });
  }
}
