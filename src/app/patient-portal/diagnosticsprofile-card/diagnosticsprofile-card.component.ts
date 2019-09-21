import { Component, OnInit, Inject } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IAppointments } from '../../models/appointment';
import { OnboardingService } from '../../services/onboarding.service';
import { DiagnosticCenter } from '../../models/diagnostic-center';

@Component({
  selector: 'app-diagnosticsprofile-card',
  templateUrl: './diagnosticsprofile-card.component.html',
  styleUrls: ['./diagnosticsprofile-card.component.css']
})
export class DiagnosticsprofileCardComponent implements OnInit {
  viewdcprofiledata: DiagnosticCenter[];
  bookdate: Date;
  constructor(private service: PatientService, private dialog: MatDialog) {
    this.viewdcprofiledata = this.service.viewdcprofiledata;
  }
  ngOnInit() {
  }
  confirmAppointment(dc: DiagnosticCenter): string {
    return dc.diagnosticCenterId;
  }
  openDialog(slotStartTime: Date, slotEndTime: Date) {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(DCConfirmBooking, {
      width: '250px',
      data: { bookdate: this.bookdate, startTime: slotStartTime, endTime: slotEndTime }
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
    @Inject(MAT_DIALOG_DATA) public data: IAppointments, private service: PatientService, private services: OnboardingService, mycard: DiagnosticsprofileCardComponent) {
    this.card = mycard;
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
  confirmAppointment(date: Date, startTime: Date, endTime: Date) {
    this.diagnosticcenterId = this.card.confirmAppointment();
    this.service.bookAppointment(this.diagnosticcenterId, this.services.userid, date, startTime, endTime).subscribe();
  }
}
