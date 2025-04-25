import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exchange-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.scss']
})
export class ExchangeFormComponent {
  currency = '';

  @Output() search = new EventEmitter<string>();

  submit() {
    const trimmed = this.currency.trim().toUpperCase();
    if (trimmed) {
      this.search.emit(trimmed);
    }
  }
}
