import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeResultComponent } from './exchange-result.component';

describe('ExchangeResultComponent', () => {
  let component: ExchangeResultComponent;
  let fixture: ComponentFixture<ExchangeResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
