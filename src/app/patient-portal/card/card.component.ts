import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Doctor } from '../../models/doctor';
import {AppointmentTimeSlot, IAppointments } from '../../models/appointment';
import { PatientService } from '../../services/patient.service';
import { OnboardingService } from '../../services/onboarding.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  panelOpenState = false;
  viewprofiledata: Doctor[];
  attendees: string[];
  appointment: IAppointments;
  bookdate: Date;
  time: string;
  slotStartTime: Date;
  slotEndTime: Date;
  // tslint:disable-next-line:variable-name
  constructor(
    private patientService: PatientService,
    private dialog: MatDialog
  ) {
    this.viewprofiledata = this.patientService.viewprofiledata;
  }

  ngOnInit() {}

  confirmAppointment(doctor: Doctor): string {
    return doctor.doctorId;
  }

  openDialog(slotStartTime: Date, slotEndTime: Date) {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(ConfirmBooking, {
      width: '250px',
      data: { Date: this.bookdate, StartTime: slotStartTime, EndTime: slotEndTime }
    });

  }
}
@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.html',
  providers: [CardComponent]
})

// tslint:disable-next-line:component-class-suffix
export class ConfirmBooking {
  card: any;
  doctorId: string;
  constructor(
    public dialogRef: MatDialogRef<ConfirmBooking>,
    // tslint:disable-next-line:max-line-length
    @Inject(MAT_DIALOG_DATA) public data: AppointmentTimeSlot, private service: PatientService, private services: OnboardingService, mycard: CardComponent) {
    this.card = mycard;
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
  confirmAppointment(date: Date, startTime: Date, endTime: Date) {
    this.doctorId = this.card.confirmAppointment();
    this.service.bookAppointment(this.doctorId, this.services.userid, date, startTime, endTime).subscribe();
  }
}
