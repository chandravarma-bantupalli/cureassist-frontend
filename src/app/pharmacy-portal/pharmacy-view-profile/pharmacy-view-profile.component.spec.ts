import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyViewProfileComponent } from './pharmacy-view-profile.component';

describe('PharmacyViewProfileComponent', () => {
  let component: PharmacyViewProfileComponent;
  let fixture: ComponentFixture<PharmacyViewProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyViewProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
