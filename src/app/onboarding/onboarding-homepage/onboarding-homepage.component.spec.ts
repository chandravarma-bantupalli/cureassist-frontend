import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingHomepageComponent } from './onboarding-homepage.component';

describe('OnboardingHomepageComponent', () => {
  let component: OnboardingHomepageComponent;
  let fixture: ComponentFixture<OnboardingHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
