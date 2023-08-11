import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategorComponent } from './product-categor.component';

describe('ProductCategorComponent', () => {
  let component: ProductCategorComponent;
  let fixture: ComponentFixture<ProductCategorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCategorComponent]
    });
    fixture = TestBed.createComponent(ProductCategorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
