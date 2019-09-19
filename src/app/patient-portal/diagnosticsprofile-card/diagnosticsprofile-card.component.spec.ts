import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticsprofileCardComponent } from './diagnosticsprofile-card.component';

describe('DiagnosticsprofileCardComponent', () => {
  let component: DiagnosticsprofileCardComponent;
  let fixture: ComponentFixture<DiagnosticsprofileCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticsprofileCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticsprofileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
