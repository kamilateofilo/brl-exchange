import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ExchangeHistoryComponent } from '../exchange-history/exchange-history.component';

interface DailyRate {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  closeDiff?: number;
}

@Component({
  selector: 'app-exchange-result',
  standalone: true,
  imports: [CommonModule, ExchangeHistoryComponent],
  templateUrl: './exchange-result.component.html',
  styleUrls: ['./exchange-result.component.scss']
})
export class ExchangeResultComponent implements OnChanges {
  @Input() currencyCode = '';
  @Input() rate: number | null = null;
  @Input() date = '';

  dailyHistory: DailyRate[] = [];
  loadingHistory = false;
  showHistory = false;

  constructor(private http: HttpClient) {}

  ngOnChanges(): void {
    if (this.currencyCode) {
      this.loadDailyHistory();
    }
  }

  toggleHistory() {
    this.showHistory = !this.showHistory;
  }

  private loadDailyHistory() {
    this.loadingHistory = true;
    const url = `http://localhost:3000/timeseries`;

    this.http.get<DailyRate[]>(url).subscribe({
      next: (res) => {
        console.log('✅ Histórico recebido:', res);

        this.dailyHistory = res.map((item, i, arr) => {
          const previous = arr[i + 1];
          return {
            ...item,
            closeDiff: previous ? +(item.close - previous.close).toFixed(2) : 0
          };
        });

        console.log('✅ dailyHistory montado:', this.dailyHistory);
        this.loadingHistory = false;
      },
      error: (err) => {
        console.error('❌ Erro ao buscar timeseries:', err);
        this.loadingHistory = false;
      }
    });
  }
}
