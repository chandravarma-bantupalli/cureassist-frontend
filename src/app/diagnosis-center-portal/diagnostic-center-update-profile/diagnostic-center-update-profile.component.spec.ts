import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticCenterUpdateProfileComponent } from './diagnostic-center-update-profile.component';

describe('DiagnosticCenterUpdateProfileComponent', () => {
  let component: DiagnosticCenterUpdateProfileComponent;
  let fixture: ComponentFixture<DiagnosticCenterUpdateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticCenterUpdateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticCenterUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
