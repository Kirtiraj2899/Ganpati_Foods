import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoCardComponent } from './product-info-card.component';

describe('ProductInfoCardComponent', () => {
  let component: ProductInfoCardComponent;
  let fixture: ComponentFixture<ProductInfoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductInfoCardComponent]
    });
    fixture = TestBed.createComponent(ProductInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
