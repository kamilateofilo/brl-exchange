import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeHomeComponent } from './exchange-home.component';

describe('ExchangeHomeComponent', () => {
  let component: ExchangeHomeComponent;
  let fixture: ComponentFixture<ExchangeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
