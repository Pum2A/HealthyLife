import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesComponent } from './prices.component';

describe('PricesComponent', () => {
  let component: PricesComponent;
  let fixture: ComponentFixture<PricesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PricesComponent]
    });
    fixture = TestBed.createComponent(PricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
