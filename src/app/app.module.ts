import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DoctorPortalModule } from './doctor-portal/doctor-portal.module';
import { DiagnosisCenterPortalModule } from './diagnosis-center-portal/diagnosis-center-portal.module';
import { PatientPortalModule } from './patient-portal/patient-portal.module';
import { PharmacyPortalModule } from './pharmacy-portal/pharmacy-portal.module';
import { OnboardingPortalModule } from './onboarding-portal/onboarding-portal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DoctorPortalModule,
    DiagnosisCenterPortalModule,
    PatientPortalModule,
    PharmacyPortalModule,
    OnboardingPortalModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
