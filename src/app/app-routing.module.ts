import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagnosticCenterHomeComponent } from './diagnosis-center-portal/diagnostic-center-home/diagnostic-center-home.component';
import { DiagnosticCenterProfileComponent } from './diagnosis-center-portal/diagnostic-center-profile/diagnostic-center-profile.component';
// tslint:disable-next-line: max-line-length
import { DiagnosticCenterUpdateProfileComponent } from './diagnosis-center-portal/diagnostic-center-update-profile/diagnostic-center-update-profile.component';
// tslint:disable-next-line: max-line-length
import { DiagnosticCenterManageSlotsComponent } from './diagnosis-center-portal/diagnostic-center-manage-slots/diagnostic-center-manage-slots.component';
import { DoctorHomeComponent } from './doctor-portal/doctor-home/doctor-home.component';
import { DoctorProfileComponent } from './doctor-portal/doctor-profile/doctor-profile.component';
import { DoctorUpdateProfileComponent } from './doctor-portal/doctor-update-profile/doctor-update-profile.component';
import { DoctorManageSlotsComponent } from './doctor-portal/doctor-manage-slots/doctor-manage-slots.component';
import { DoctorViewAppointmentsComponent } from './doctor-portal/doctor-view-appointments/doctor-view-appointments.component';
import { LoginComponent } from './onboarding/login/login.component';
import { RegisterComponent } from './onboarding/register/register.component';
import { SetpasswordComponent } from './onboarding/setpassword/setpassword.component';
import { ResetpasswordComponent } from './onboarding/resetpassword/resetpassword.component';
import { OnboardingHomepageComponent } from './onboarding/onboarding-homepage/onboarding-homepage.component';
import { HomePageComponent } from './patient-portal/home-page/home-page.component';
import { EditprofilePageComponent } from './patient-portal/editprofile-page/editprofile-page.component';
import { ViewEditComponent } from './patient-portal/view-edit/view-edit.component';
import { SearchComponent } from './patient-portal/search/search.component';
import { CardComponent } from './patient-portal/card/card.component';
import { DiagnosticsprofileCardComponent } from './patient-portal/diagnosticsprofile-card/diagnosticsprofile-card.component';
import { ViewPrescriptionComponent } from './medical-records/view-prescription/view-prescription.component';
import { ViewTestreportsComponent } from './medical-records/view-testreports/view-testreports.component';
import { PharmacyHomeComponent } from './pharmacy-portal/pharmacy-home/pharmacy-home.component';
import { PharmacyProfileComponent } from './pharmacy-portal/pharmacy-profile/pharmacy-profile.component';
import { PharmacyViewProfileComponent } from './pharmacy-portal/pharmacy-view-profile/pharmacy-view-profile.component';
import { PharmacyOrdersPageComponent } from './pharmacy-portal/pharmacy-orders-page/pharmacy-orders-page.component';


const routes: Routes = [
  { path: 'onboarding', children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'setpassword/:UserId', component: SetpasswordComponent},
    {path: 'resetpassword', component: ResetpasswordComponent},
    {path: '', component: OnboardingHomepageComponent}
  ]},
  {path: 'patient', children: [
    {path: 'home', component: HomePageComponent},
    {path: 'profile/post', component: EditprofilePageComponent},
    {path: 'view-edit', component: ViewEditComponent },
    {path: 'search', component: SearchComponent},
    {path: 'viewprofile', component: CardComponent},
    {path: 'viewdcprofile', component: DiagnosticsprofileCardComponent}
  ]},
  {path: 'medicalrecords', children: [
    {path: 'viewprescription', component: ViewPrescriptionComponent},
    {path: 'viewtestreport', component: ViewTestreportsComponent}
  ]},
  {path: 'diagnosisCenter', children: [
    {path: 'home', component: DiagnosticCenterHomeComponent},
    {path: 'profile', component: DiagnosticCenterProfileComponent, children: []},
    {path: 'update', component: DiagnosticCenterUpdateProfileComponent},
    {path: 'manage', children: [
      {path: 'timeslots', component: DiagnosticCenterManageSlotsComponent}
    ]}
  ]},
  {path: 'doctor', children: [
    {path: 'home', component: DoctorHomeComponent},
    {path: 'profile', component: DoctorProfileComponent, children: []},
    {path: 'update', component: DoctorUpdateProfileComponent},
    {path: 'manage', children: [
      {path: 'timeslots', component: DoctorManageSlotsComponent}
    ]},
    {path: 'view', component: DoctorViewAppointmentsComponent},
  ]},
  {path: 'pharmacy', children: [
    {path: 'home', component: PharmacyHomeComponent},
    {path: 'pharmacy/createprofile', component: PharmacyProfileComponent},
    { path: 'pharmacy/view/:emailid', component: PharmacyViewProfileComponent },
    { path: 'pharmacy/orders', component: PharmacyOrdersPageComponent }
  ]},
  {path: '', pathMatch: 'full', component: OnboardingHomepageComponent},
  {path: 'patient', pathMatch: 'full', component: HomePageComponent},
  {path: 'doctor', pathMatch: 'full', component: DoctorHomeComponent},
  {path: 'diagnosisCenter', pathMatch: 'full', component: DiagnosticCenterHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
