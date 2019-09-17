import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorManageSlotsComponent } from './doctor-manage-slots.component';

describe('DoctorManageSlotsComponent', () => {
  let component: DoctorManageSlotsComponent;
  let fixture: ComponentFixture<DoctorManageSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorManageSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorManageSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
