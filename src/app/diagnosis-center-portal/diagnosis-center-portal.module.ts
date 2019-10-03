import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatExpansionModule, MatChipsModule,
  MatMenuModule,
  MatTableModule} from '@angular/material';
import { MatListModule, MatGridListModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';

import { DiagnosticCenterHeaderComponent } from './diagnostic-center-header/diagnostic-center-header.component';
import { DiagnosticCenterHomeComponent } from './diagnostic-center-home/diagnostic-center-home.component';
import { DiagnosticCenterProfileComponent } from './diagnostic-center-profile/diagnostic-center-profile.component';
import { DiagnosticCenterUpdateProfileComponent } from './diagnostic-center-update-profile/diagnostic-center-update-profile.component';
import { DiagnosticCenterManageSlotsComponent } from './diagnostic-center-manage-slots/diagnostic-center-manage-slots.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TimeSlotComponent } from './time-slot/time-slot.component';
// tslint:disable-next-line: max-line-length
import { DiagnosticCenterViewAppointmentsComponent } from './diagnostic-center-view-appointments/diagnostic-center-view-appointments.component';
import { AvatarModule } from 'ngx-avatar';
import { CdkTableModule } from '@angular/cdk/table';
import { ViewAppointmentDetailsComponent } from './view-appointment-details/view-appointment-details.component';
import { DcAppointmentHistoryComponent } from './dc-appointment-history/dc-appointment-history.component';
import { RatingModule } from 'ng-starrating';


@NgModule({
  declarations: [
    DiagnosticCenterHeaderComponent,
    DiagnosticCenterHomeComponent,
    DiagnosticCenterProfileComponent,
    DiagnosticCenterUpdateProfileComponent,
    DiagnosticCenterManageSlotsComponent,
    TimeSlotComponent,
    DiagnosticCenterViewAppointmentsComponent,
    ViewAppointmentDetailsComponent,
    DcAppointmentHistoryComponent
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
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    MatTableModule,
    CdkTableModule,
    RatingModule
  ],
  exports: [
    DiagnosticCenterHeaderComponent,
    DiagnosticCenterHomeComponent,
    DiagnosticCenterProfileComponent,
    DiagnosticCenterUpdateProfileComponent,
    DiagnosticCenterManageSlotsComponent,
    DiagnosticCenterViewAppointmentsComponent,
    DcAppointmentHistoryComponent
  ],
  entryComponents: [TimeSlotComponent, ViewAppointmentDetailsComponent]
})
export class DiagnosisCenterPortalModule { }
