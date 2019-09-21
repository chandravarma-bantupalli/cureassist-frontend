import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyOrdersPageComponent } from './pharmacy-orders-page.component';

describe('PharmacyOrdersPageComponent', () => {
  let component: PharmacyOrdersPageComponent;
  let fixture: ComponentFixture<PharmacyOrdersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyOrdersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyOrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
