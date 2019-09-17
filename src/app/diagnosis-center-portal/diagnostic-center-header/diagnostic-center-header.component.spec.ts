import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticCenterHeaderComponent } from './diagnostic-center-header.component';

describe('DiagnosticCenterHeaderComponent', () => {
  let component: DiagnosticCenterHeaderComponent;
  let fixture: ComponentFixture<DiagnosticCenterHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticCenterHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticCenterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
