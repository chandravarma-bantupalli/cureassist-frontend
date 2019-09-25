import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyConfirmOrdersComponent } from './pharmacy-confirm-orders.component';

describe('PharmacyConfirmOrdersComponent', () => {
  let component: PharmacyConfirmOrdersComponent;
  let fixture: ComponentFixture<PharmacyConfirmOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyConfirmOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyConfirmOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
