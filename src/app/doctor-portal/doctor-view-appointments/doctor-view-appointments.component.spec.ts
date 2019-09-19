import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorViewAppointmentsComponent } from './doctor-view-appointments.component';

describe('DoctorViewAppointmentsComponent', () => {
  let component: DoctorViewAppointmentsComponent;
  let fixture: ComponentFixture<DoctorViewAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorViewAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorViewAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
