import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TimeSlot } from '../../models/time-slot';
import { TimeSlotService } from '../../services/time-slot.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.css']
})
export class TimeSlotComponent implements OnInit {

  timeSlot: TimeSlot;
  tsForm: FormGroup;
  userid: string;
  tsId: string;
  timeSlotValueNotNull: boolean;

  constructor(
    public dialogRef: MatDialogRef<TimeSlotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeSlot,
    private timeSlotService: TimeSlotService,
    private formBuilder: FormBuilder,
    private onboardingService: OnboardingService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.userid = '45987123-ed2456';
    this.tsId = this.timeSlotService.timeSlotId;
    this.initiateTimeSlotForm();
    this.getTimeSlotValue();
  }

  getTimeSlotValue() {
    this.timeSlotService.getSingleTimeSlotOfDiagnosticCenter(this.userid, this.tsId).subscribe((data) => {
      this.timeSlot = data;
      this.tsForm.setValue(data);
      this.timeSlotValueNotNull = true;
    }, (err: Error) => {
      this.timeSlotValueNotNull = false;
    });
  }

  initiateTimeSlotForm() {
    this.tsForm = this.formBuilder.group({
      slotId: '',
      userId: '',
      diagnosticCenterId: '45987123-ed2456',
      testConductedInSlot: '',
      slotStartTime: '',
      slotEndTime: '',
      slotCapacity: 0
    });
  }

  updateTimeSlot() {
    console.log('update method call');
    // tslint:disable-next-line: max-line-length
    this.timeSlotService.updateDiagnosticCenterTimeSlot(this.userid, this.tsId, this.tsForm.value).subscribe((data) => {
      console.log(data);
    });
    this.onNoClick();
  }

  addNewTimeSlot() {
    console.log('add new time slot method called');
    const diagCenSlot: TimeSlot = this.tsForm.value;
    diagCenSlot.diagnosticCenterId = this.userid;
    this.timeSlotService.addNewTimeSlotToDiagnosticCenter(this.userid, diagCenSlot).subscribe((data) => {
      console.log(data);
    });
    this.onNoClick();
  }

}
