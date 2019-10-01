import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyEditProfileDialogComponent } from './pharmacy-edit-profile-dialog.component';

describe('PharmacyEditProfileDialogComponent', () => {
  let component: PharmacyEditProfileDialogComponent;
  let fixture: ComponentFixture<PharmacyEditProfileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyEditProfileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyEditProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
