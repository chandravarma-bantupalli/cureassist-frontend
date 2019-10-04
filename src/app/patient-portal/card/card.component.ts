import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent,
   MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { Doctor } from '../../models/doctor';
import {AppointmentTimeSlot, IAppointments } from '../../models/appointment';
import { PatientService } from '../../services/patient.service';
import { OnboardingService } from '../../services/onboarding.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  panelOpenState = false;
  viewprofiledata: Doctor;
  attendees: string[];
  appointment: IAppointments;
  bookdate: Date;
  time: string;
  slotStartTime: Date;
  slotEndTime: Date;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  symptomsCtrl: string[] = [];
  filteredSymptoms: Observable<string[]>;
  symptoms: string[] = [];
  allSymptoms: Array<string> = [];

  @ViewChild('symptomInput', { static: false }) symptomInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  // tslint:disable-next-line:variable-name
  constructor(
    private patientService: PatientService,
    private dialog: MatDialog
  ) {
    this.viewprofiledata = this.patientService.viewprofiledata;
    console.log(this.viewprofiledata);
  }

  ngOnInit() {}

  confirmAppointment(doctorId: string): string {
    console.log(doctorId);
    return doctorId;
  }
  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.symptoms.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  }

  remove(symptom: string): void {
    const index = this.symptoms.indexOf(symptom);

    if (index >= 0) {
      this.symptoms.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.symptoms.push(event.option.viewValue);
    this.symptomInput.nativeElement.value = '';

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSymptoms.filter(symptom => symptom.toLowerCase().indexOf(filterValue) === 0);
  }

  openDialog(slotStartTime: Date, slotEndTime: Date, doctorId: string, symptom: string[]) {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(ConfirmBooking, {
      width: '500px',
      data: { Date: this.bookdate, StartTime: slotStartTime, EndTime: slotEndTime, DoctorId: doctorId , symptoms: symptom}
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
  confirmAppointment(date: Date, startTime: Date, endTime: Date, doctorId: string, symptoms: string[]) {
    // this.doctorId = this.card.confirmAppointment(doctorId);
    this.service.bookAppointment(this.services.userid, doctorId, date, startTime, endTime, symptoms).subscribe();
  }
}
