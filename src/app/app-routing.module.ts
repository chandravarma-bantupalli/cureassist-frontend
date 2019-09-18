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
import { PrefixNot } from '@angular/compiler';


const routes: Routes = [
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
    ]}
  ]},
  {path: '', redirectTo: '/doctor/home', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
