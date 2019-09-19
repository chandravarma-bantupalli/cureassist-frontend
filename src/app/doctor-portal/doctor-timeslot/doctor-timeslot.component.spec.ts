import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTimeslotComponent } from './doctor-timeslot.component';

describe('DoctorTimeslotComponent', () => {
  let component: DoctorTimeslotComponent;
  let fixture: ComponentFixture<DoctorTimeslotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorTimeslotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorTimeslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
