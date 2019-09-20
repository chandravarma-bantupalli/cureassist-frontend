import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { DoctorPortalModule } from './doctor-portal/doctor-portal.module';
import { DiagnosisCenterPortalModule } from './diagnosis-center-portal/diagnosis-center-portal.module';
import { PatientPortalModule } from './patient-portal/patient-portal.module';
import { PharmacyPortalModule } from './pharmacy-portal/pharmacy-portal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { OnboardingModule } from './onboarding/onboarding.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { ConfirmBooking } from './patient-portal/card/card.component';
import { DCConfirmBooking } from './patient-portal/diagnosticsprofile-card/diagnosticsprofile-card.component';
import { BuyNow } from './medical-records/view-prescription/view-prescription.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [ConfirmBooking, DCConfirmBooking, BuyNow],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DoctorPortalModule,
    DiagnosisCenterPortalModule,
    PatientPortalModule,
    PharmacyPortalModule,
    OnboardingModule,
    MedicalRecordsModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
