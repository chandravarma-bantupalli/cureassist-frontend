import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestreportsComponent } from './view-testreports.component';

describe('ViewTestreportsComponent', () => {
  let component: ViewTestreportsComponent;
  let fixture: ComponentFixture<ViewTestreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTestreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTestreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
