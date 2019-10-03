import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorHeaderComponent } from './doctor-header/doctor-header.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { DoctorManageSlotsComponent } from './doctor-manage-slots/doctor-manage-slots.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorUpdateProfileComponent } from './doctor-update-profile/doctor-update-profile.component';
// tslint:disable-next-line: max-line-length
import { MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatDialogModule, MatDialogRef, MatAutocompleteModule } from '@angular/material';
import { MatListModule, MatSidenavModule, MatGridListModule, MatCardModule, MatExpansionModule, MatChipsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorTimeslotComponent } from './doctor-timeslot/doctor-timeslot.component';
import { DoctorViewAppointmentsComponent } from './doctor-view-appointments/doctor-view-appointments.component';
import { PrescriptionFormComponent } from '../prescription/prescription-form/prescription-form.component';
import { PrescriptionModule } from '../prescription/prescription.module';
import { MatTableModule } from '@angular/material/table';
import { AvatarModule } from 'ngx-avatar';
import { MatDividerModule } from '@angular/material';
import { DoctorAppointmentHistoryComponent } from './doctor-appointment-history/doctor-appointment-history.component';
import { CdkTableModule } from '@angular/cdk/table';
import { RatingModule } from 'ng-starrating';
@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    DoctorHeaderComponent,
    DoctorHomeComponent,
    DoctorManageSlotsComponent,
    DoctorProfileComponent,
    DoctorUpdateProfileComponent,
    DoctorTimeslotComponent,
    DoctorViewAppointmentsComponent,
    DoctorAppointmentHistoryComponent
  ],
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
    MatMenuModule,
    FormsModule,
    AvatarModule,
    ReactiveFormsModule,
    PrescriptionModule,
    MatTableModule,
    AvatarModule,
    MatDialogModule,
    MatDividerModule,
    MatAutocompleteModule,
    CdkTableModule,
    RatingModule
  ],
  exports: [
   DoctorHeaderComponent,
   DoctorHomeComponent,
   DoctorProfileComponent,
   DoctorUpdateProfileComponent,
   DoctorManageSlotsComponent,
   DoctorViewAppointmentsComponent,
   DoctorAppointmentHistoryComponent
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} }
  ],
  entryComponents: [
    DoctorTimeslotComponent,
    DoctorUpdateProfileComponent,
    PrescriptionFormComponent
  ]
})
export class DoctorPortalModule { }
