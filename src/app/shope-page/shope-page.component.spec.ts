import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopePageComponent } from './shope-page.component';

describe('ShopePageComponent', () => {
  let component: ShopePageComponent;
  let fixture: ComponentFixture<ShopePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopePageComponent]
    });
    fixture = TestBed.createComponent(ShopePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
