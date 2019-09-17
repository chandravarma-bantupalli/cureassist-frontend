import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticCenterProfileComponent } from './diagnostic-center-profile.component';

describe('DiagnosticCenterProfileComponent', () => {
  let component: DiagnosticCenterProfileComponent;
  let fixture: ComponentFixture<DiagnosticCenterProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticCenterProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticCenterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
