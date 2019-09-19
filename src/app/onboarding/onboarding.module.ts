import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { OnboardingHomepageComponent } from './onboarding-homepage/onboarding-homepage.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    OnboardingHomepageComponent,
    RegisterComponent,
    ResetpasswordComponent,
    SetpasswordComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AuthComponent,
    LoginComponent,
    OnboardingHomepageComponent,
    RegisterComponent,
    ResetpasswordComponent,
    SetpasswordComponent
  ]
})
export class OnboardingModule { }
