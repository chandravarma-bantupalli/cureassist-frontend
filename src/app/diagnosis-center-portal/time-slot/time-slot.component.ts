import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TimeSlot } from '../../models/time-slot';
import { TimeSlotService } from '../../services/time-slot.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.css']
})
export class TimeSlotComponent implements OnInit {

  timeSlot: TimeSlot;
  tsForm: FormGroup;
  dcId: string;
  tsId: string;
  timeSlotValueNotNull: boolean;

  constructor(
    public dialogRef: MatDialogRef<TimeSlotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeSlot,
    private timeSlotService: TimeSlotService,
    private formBuilder: FormBuilder
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.dcId = this.timeSlotService.dcId;
    this.tsId = this.timeSlotService.timeSlotId;
    this.initiateTimeSlotForm();
    this.getTimeSlotValue();
  }

  getTimeSlotValue() {
    this.timeSlotService.getSingleTimeSlotOfDiagnosticCenter(this.dcId, this.tsId).subscribe((data) => {
      this.timeSlot = data;
      this.tsForm.setValue(data);
      this.timeSlotValueNotNull = true;
    }, (err: Error) => {
      this.timeSlot = new TimeSlot();
      this.timeSlotValueNotNull = false;
    });
  }

  initiateTimeSlotForm() {
    this.tsForm = this.formBuilder.group({
      slotId: '',
      diagnosticCenterId: this.timeSlotService.dcId,
      testConductedInSlot: '',
      slotDate: '',
      slotStartTime: '',
      slotEndTime: '',
      slotCapacity: 0
    });
  }

  updateTimeSlot() {
    console.log('update method call');
    // tslint:disable-next-line: max-line-length
    this.timeSlotService.updateDiagnosticCenterTimeSlot(this.timeSlot.diagnosticCenterId, this.timeSlot.slotId, this.tsForm.value).subscribe((data) => {
      console.log(data);
    });
    this.onNoClick();
  }

  addNewTimeSlot() {
    console.log('add new time slot method called');
    const diagCenSlot: TimeSlot = this.tsForm.value;
    this.timeSlotService.addNewTimeSlotToDiagnosticCenter(this.timeSlotService.dcId, diagCenSlot).subscribe((data) => {
      console.log(data);
    });
    this.onNoClick();
  }

}
