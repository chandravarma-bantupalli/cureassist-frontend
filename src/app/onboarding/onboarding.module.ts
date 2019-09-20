import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { OnboardingHomepageComponent } from './onboarding-homepage/onboarding-homepage.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { OnboardingService } from '../services/onboarding.service';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../models/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { PatientPortalModule } from '../patient-portal/patient-portal.module';



@NgModule({
  declarations: [
    LoginComponent,
    OnboardingHomepageComponent,
    RegisterComponent,
    ResetpasswordComponent,
    SetpasswordComponent
  ],
  imports: [
    CommonModule,
    PatientPortalModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [
    LoginComponent,
    OnboardingHomepageComponent,
    RegisterComponent,
    ResetpasswordComponent,
    SetpasswordComponent
  ],
  providers: [OnboardingService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
})
export class OnboardingModule { }
