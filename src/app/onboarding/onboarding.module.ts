import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { OnboardingHomepageComponent } from './onboarding-homepage/onboarding-homepage.component';
import { RegisterComponent, BottomSheet } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { OnboardingService } from '../services/onboarding.service';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../models/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule, MatCardModule, MatIconModule } from '@angular/material';
import { PatientPortalModule } from '../patient-portal/patient-portal.module';
<<<<<<< HEAD
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

=======
import { PatientLandingPageComponent } from './patient-landing-page/patient-landing-page.component';
>>>>>>> 76ced42ebadaed3e4ec55f1f5c3a480b83b44f99


@NgModule({
  declarations: [
    LoginComponent,
    OnboardingHomepageComponent,
    RegisterComponent,
    ResetpasswordComponent,
<<<<<<< HEAD
    SetpasswordComponent,BottomSheet
=======
    SetpasswordComponent,
    PatientLandingPageComponent
>>>>>>> 76ced42ebadaed3e4ec55f1f5c3a480b83b44f99
  ],
  imports: [
    CommonModule,
    PatientPortalModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
<<<<<<< HEAD
    MatBottomSheetModule
=======
    MatCardModule,
    MatIconModule
>>>>>>> 76ced42ebadaed3e4ec55f1f5c3a480b83b44f99
  ],
  exports: [
    LoginComponent,
    OnboardingHomepageComponent,
    RegisterComponent,
    ResetpasswordComponent,
    SetpasswordComponent,
    PatientLandingPageComponent
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
