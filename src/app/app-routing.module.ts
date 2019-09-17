import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagnosticCenterHomeComponent } from './diagnosis-center-portal/diagnostic-center-home/diagnostic-center-home.component';


const routes: Routes = [
  {path: 'diagnosisCenter', children: [
    {path: 'home', component: DiagnosticCenterHomeComponent}
  ]},
  {path: '', redirectTo: '/diagnosisCenter/home', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
