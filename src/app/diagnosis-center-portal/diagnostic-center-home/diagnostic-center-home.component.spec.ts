import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticCenterHomeComponent } from './diagnostic-center-home.component';

describe('DiagnosticCenterHomeComponent', () => {
  let component: DiagnosticCenterHomeComponent;
  let fixture: ComponentFixture<DiagnosticCenterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticCenterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticCenterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
