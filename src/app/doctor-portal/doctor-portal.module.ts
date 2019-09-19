import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorHeaderComponent } from './doctor-header/doctor-header.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { DoctorManageSlotsComponent } from './doctor-manage-slots/doctor-manage-slots.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorUpdateProfileComponent } from './doctor-update-profile/doctor-update-profile.component';
// tslint:disable-next-line: max-line-length
import { MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatGridListModule, MatCardModule, MatExpansionModule, MatChipsModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorTimeslotComponent } from './doctor-timeslot/doctor-timeslot.component';
import { DoctorViewAppointmentsComponent } from './doctor-view-appointments/doctor-view-appointments.component';




@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [DoctorHeaderComponent, DoctorHomeComponent, DoctorManageSlotsComponent, DoctorProfileComponent, DoctorUpdateProfileComponent, DoctorTimeslotComponent, DoctorViewAppointmentsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
   DoctorHeaderComponent,
   DoctorHomeComponent,
   DoctorProfileComponent,
   DoctorUpdateProfileComponent,
   DoctorManageSlotsComponent,
   DoctorViewAppointmentsComponent
  ],
  entryComponents: [
    DoctorTimeslotComponent
  ]
})
export class DoctorPortalModule { }
