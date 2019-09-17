import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticCenterManageSlotsComponent } from './diagnostic-center-manage-slots.component';

describe('DiagnosticCenterManageSlotsComponent', () => {
  let component: DiagnosticCenterManageSlotsComponent;
  let fixture: ComponentFixture<DiagnosticCenterManageSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticCenterManageSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticCenterManageSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
