import { Component, OnInit, Inject } from '@angular/core';
import { TimeSlot } from 'src/app/models/time-slot';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TimeSlotService } from '../../services/time-slot.service';
import { OnboardingService } from '../../services/onboarding.service';


@Component({
  selector: 'app-doctor-timeslot',
  templateUrl: './doctor-timeslot.component.html',
  styleUrls: ['./doctor-timeslot.component.css']
})
export class DoctorTimeslotComponent implements OnInit {
  timeSlot: TimeSlot;
  tsForm: FormGroup;
  dcId: string;
  tsId: string;
  timeSlotValueNotNull: boolean;
  doctorId: string;


  constructor(
    public dialogRef: MatDialogRef<DoctorTimeslotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeSlot,
    private timeSlotService: TimeSlotService,
    private formBuilder: FormBuilder,
    private onboardingService: OnboardingService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    // this.doctorId = this.onboardingService.userid;
    this.tsId = this.timeSlotService.timeSlotId;
    this.initiateTimeSlotForm();
    this.getTimeSlotValue();
  }

  initiateTimeSlotForm() {
    this.tsForm = this.formBuilder.group({
      slotId: '',
    //  doctorId: this.timeSlotService.doctorId,
      slotStartTime: '',
      slotEndTime: '',
      slotCapacity: 0
    });
  }


  getTimeSlotValue() {
    this.timeSlotService.getSingleTimeSlotOfDoctor('', this.tsId).subscribe((data) => {
      this.timeSlot = data;
      this.tsForm.setValue(data);
      this.timeSlotValueNotNull = true;
    }, (err: Error) => {
      this.timeSlot = new TimeSlot();
      this.timeSlotValueNotNull = false;
    });
  }

  updateTimeSlot() {
    console.log('update method call');
    // tslint:disable-next-line: max-line-length
    this.timeSlotService.updateDoctorTimeSlot('', this.tsId, this.tsForm.value).subscribe((data) => {
      console.log(data);
    });
    this.onNoClick();
  }

  addNewTimeSlot() {
    console.log('add new time slot method called');
    const doctorSlot: TimeSlot = this.tsForm.value;
    console.log(doctorSlot);
    this.timeSlotService.addNewTimeSlotToDoctor(doctorSlot).subscribe((data) => {
      console.log(data);
    });
    this.onNoClick();
    // this.onboardingService.userid = this.doctorId;
  }

}
