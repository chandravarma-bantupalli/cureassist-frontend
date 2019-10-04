import { Component, OnInit, Inject } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OnboardingService } from '../../services/onboarding.service';
import { DiagnosticCenter } from '../../models/diagnostic-center';
import { AppointmentTimeSlot } from 'src/app/models/appointment';

@Component({
  selector: 'app-diagnosticsprofile-card',
  templateUrl: './diagnosticsprofile-card.component.html',
  styleUrls: ['./diagnosticsprofile-card.component.css']
})
export class DiagnosticsprofileCardComponent implements OnInit {
  viewdcprofiledata: DiagnosticCenter;
  bookdate: Date;
  panelOpenState = false;
  constructor(private service: PatientService, private dialog: MatDialog) {
    this.viewdcprofiledata = this.service.viewdcprofiledata;
    console.log(this.viewdcprofiledata);
  }
  ngOnInit() {
  }
  confirmAppointment(diagnosticCenterId: string): string {
    return diagnosticCenterId;
  }
  openDialog(slotStartTime: Date, slotEndTime: Date, diagnosticCenterId: string) {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(DCConfirmBooking, {
      width: '350px',
      data: { Date: this.bookdate, StartTime: slotStartTime, EndTime: slotEndTime, DiagnosticCenterId: diagnosticCenterId }
    });

  }
}
@Component({
  selector: 'app-dcconfirm-booking',
  templateUrl: 'dcconfirm-booking.html',
  providers: [DiagnosticsprofileCardComponent]
})
// tslint:disable-next-line:component-class-suffix
export class DCConfirmBooking {
  card: any;
  diagnosticcenterId: string;
  constructor(
    public dialogRef: MatDialogRef<DCConfirmBooking>,
    // tslint:disable-next-line:max-line-length
    @Inject(MAT_DIALOG_DATA) public data: AppointmentTimeSlot, private service: PatientService, private services: OnboardingService, mycard: DiagnosticsprofileCardComponent) {
    this.card = mycard;
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
  confirmAppointment(date: Date, startTime: Date, endTime: Date, diagnosticCenterId: string) {
    //this.diagnosticcenterId = this.card.confirmAppointment(diagnosticCenterId);
    this.service.dcbookAppointment(this.services.userid, diagnosticCenterId, date, startTime, endTime).subscribe();
  }
}
