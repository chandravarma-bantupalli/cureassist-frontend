import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { DiagnosticsprofileCardComponent } from './diagnosticsprofile-card/diagnosticsprofile-card.component';
import { EditprofilePageComponent } from './editprofile-page/editprofile-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchComponent } from './search/search.component';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';
import { ViewEditComponent } from './view-edit/view-edit.component';



@NgModule({
  declarations: [
    CardComponent,
    DiagnosticsprofileCardComponent,
    EditprofilePageComponent,
    HomePageComponent,
    SearchComponent,
    ViewAppointmentComponent,
    ViewEditComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    DiagnosticsprofileCardComponent,
    EditprofilePageComponent,
    HomePageComponent,
    SearchComponent,
    ViewAppointmentComponent,
    ViewEditComponent
  ]
})
export class PatientPortalModule { }
