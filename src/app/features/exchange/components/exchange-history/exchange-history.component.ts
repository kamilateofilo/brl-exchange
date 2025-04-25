import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HistoryItem {
  date: string;
  close: number;
  open?: number;
  high?: number;
  low?: number;
  closeDiff?: number;
}

@Component({
  selector: 'app-exchange-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exchange-history.component.html',
  styleUrls: ['./exchange-history.component.scss']
})
export class ExchangeHistoryComponent implements OnChanges {
  @Input() history: HistoryItem[] = [];
  enrichedHistory: (HistoryItem & { closeDiff: number })[] = [];

  ngOnChanges() {
    this.enrichedHistory = this.history.map((item, index, arr) => {
      const previous = arr[index + 1];
      const closeDiff = previous ? ((item.close - previous.close) / previous.close) * 100 : 0;
      return { ...item, closeDiff: parseFloat(closeDiff.toFixed(2)) };
    });
  }
}
