import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ConfirmBooking } from './card/card.component';
import { DiagnosticsprofileCardComponent, DCConfirmBooking } from './diagnosticsprofile-card/diagnosticsprofile-card.component';
import { EditprofilePageComponent } from './editprofile-page/editprofile-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchComponent } from './search/search.component';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';
import { ViewEditComponent } from './view-edit/view-edit.component';
import {
  MatCardModule,
  MatIconModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatInputModule,
  MatTableModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatMenuModule,
  MatRadioModule,
  MatExpansionModule,
  MatListModule,
  MatNativeDateModule,
 } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    CardComponent,
    DiagnosticsprofileCardComponent,
    EditprofilePageComponent,
    HomePageComponent,
    SearchComponent,
    ViewAppointmentComponent,
    ViewEditComponent,
    ConfirmBooking,
    DCConfirmBooking
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule, MatDatepickerModule, MatInputModule, MatTableModule, MatToolbarModule,
    MatButtonToggleModule,
    FormsModule, MatButtonModule, MatMenuModule, MatRadioModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatListModule,
    AppRoutingModule,
    MatNativeDateModule
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
