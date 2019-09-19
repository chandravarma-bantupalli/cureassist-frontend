import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofilePageComponent } from './editprofile-page.component';

describe('EditprofilePageComponent', () => {
  let component: EditprofilePageComponent;
  let fixture: ComponentFixture<EditprofilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprofilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprofilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
