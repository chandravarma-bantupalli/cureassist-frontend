import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagnosticCenterHomeComponent } from './diagnosis-center-portal/diagnostic-center-home/diagnostic-center-home.component';
import { DiagnosticCenterProfileComponent } from './diagnosis-center-portal/diagnostic-center-profile/diagnostic-center-profile.component';
// tslint:disable-next-line: max-line-length
import { DiagnosticCenterUpdateProfileComponent } from './diagnosis-center-portal/diagnostic-center-update-profile/diagnostic-center-update-profile.component';
// tslint:disable-next-line: max-line-length
import { DiagnosticCenterManageSlotsComponent } from './diagnosis-center-portal/diagnostic-center-manage-slots/diagnostic-center-manage-slots.component';


const routes: Routes = [
  {path: 'diagnosisCenter', children: [
    {path: 'home', component: DiagnosticCenterHomeComponent},
    {path: 'profile', component: DiagnosticCenterProfileComponent, children: []},
    {path: 'update', component: DiagnosticCenterUpdateProfileComponent},
    {path: 'manage', children: [
      {path: 'timeslots', component: DiagnosticCenterManageSlotsComponent}
    ]}
  ]},
  {path: '', redirectTo: '/diagnosisCenter/home', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
