import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopRegistrationComponent } from './shop-registration.component';

describe('ShopRegistrationComponent', () => {
  let component: ShopRegistrationComponent;
  let fixture: ComponentFixture<ShopRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopRegistrationComponent]
    });
    fixture = TestBed.createComponent(ShopRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
