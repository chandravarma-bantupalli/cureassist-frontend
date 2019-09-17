import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorUpdateProfileComponent } from './doctor-update-profile.component';

describe('DoctorUpdateProfileComponent', () => {
  let component: DoctorUpdateProfileComponent;
  let fixture: ComponentFixture<DoctorUpdateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorUpdateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
