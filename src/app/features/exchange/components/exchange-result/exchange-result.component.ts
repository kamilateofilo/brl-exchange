import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface DailyRate {
  date: string;
  close: number;
  closeDiff?: number;
}

@Component({
  selector: 'app-exchange-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exchange-result.component.html',
  styleUrls: ['./exchange-result.component.scss']
})
export class ExchangeResultComponent implements OnChanges {
  @Input() currencyCode = '';
  @Input() rate: number | null = null;
  @Input() date = '';

  dailyHistory: DailyRate[] = [];
  loadingHistory = false;
  private apiKey = 'RVZG0GHEV2KORLNA';

  constructor(private http: HttpClient) {}

  ngOnChanges(): void {
    if (this.currencyCode) {
      this.loadDailyHistory();
    }
  }

  private loadDailyHistory() {
    this.loadingHistory = true;
    const url = 
      `https://api-brl-exchange.actionlabs.com.br/api/1.0/open/dailyExchangeRate` +
      `?apiKey=${this.apiKey}` +
      `&from_symbol=BRL&to_symbol=${this.currencyCode}`;

    console.log('🔗 URL dailyExchangeRate:', url);

    this.http.get<any>(url).subscribe({
      next: (res) => {
        console.log('✅ dailyExchangeRate:', res);
        const vals = (res.values || []).map((v: any) => ({
          date: v.datetime,
          close: parseFloat(v.close)
        }));
        this.dailyHistory = vals.map((item: DailyRate, i: number, arr: DailyRate[]) => {
          if (i === arr.length - 1) return item;
          return {
            ...item,
            closeDiff: +(item.close - arr[i + 1].close).toFixed(2)
          };
        });
        this.loadingHistory = false;
      },
      error: (err) => {
        console.error('❌ Erro dailyExchangeRate:', err);
        this.loadingHistory = false;
      }
    });
  }
}
