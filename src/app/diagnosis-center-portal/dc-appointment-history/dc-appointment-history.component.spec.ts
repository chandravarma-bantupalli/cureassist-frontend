import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcAppointmentHistoryComponent } from './dc-appointment-history.component';

describe('DcAppointmentHistoryComponent', () => {
  let component: DcAppointmentHistoryComponent;
  let fixture: ComponentFixture<DcAppointmentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcAppointmentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcAppointmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
