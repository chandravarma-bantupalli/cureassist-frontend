import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticCenterViewAppointmentsComponent } from './diagnostic-center-view-appointments.component';

describe('DiagnosticCenterViewAppointmentsComponent', () => {
  let component: DiagnosticCenterViewAppointmentsComponent;
  let fixture: ComponentFixture<DiagnosticCenterViewAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticCenterViewAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticCenterViewAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
