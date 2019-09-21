import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyCurrentOrderComponent } from './pharmacy-current-order.component';

describe('PharmacyCurrentOrderComponent', () => {
  let component: PharmacyCurrentOrderComponent;
  let fixture: ComponentFixture<PharmacyCurrentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyCurrentOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyCurrentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
