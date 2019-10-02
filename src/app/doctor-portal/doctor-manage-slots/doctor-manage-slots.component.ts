import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../../models/time-slot';
import { MatDialog } from '@angular/material';
import { DoctorTimeslotComponent } from '../doctor-timeslot/doctor-timeslot.component';
import { TimeSlotService } from '../../services/time-slot.service';
import { OnboardingService } from '../../services/onboarding.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-doctor-manage-slots',
  templateUrl: './doctor-manage-slots.component.html',
  styleUrls: ['./doctor-manage-slots.component.css']
})
export class DoctorManageSlotsComponent implements OnInit {

  timeSlots: TimeSlot[];
  timeSlotsExist: boolean;
  addSlotButtonClicked = false;
  timeSlotForm: FormGroup;
  userid: string;

  constructor(
    private dialog: MatDialog,
    private timeSlotService: TimeSlotService,
    private onboardingService: OnboardingService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    this.userid = this.onboardingService.userid;
    this.getAllDoctorTimeSlots(this.userid);
  }

  initiateTimeSlotForm() {
    this.timeSlotForm = this.formBuilder.group({
      slotId: '',
      slotStartTime: '',
      slotEndTime: '',
      doctorId: '',
      slotCapacity: ''
    });
  }


  getAllDoctorTimeSlots(id: string) {
    this.timeSlotService.getDoctorTimeSlots(id).subscribe((data) => {
      console.log(data);
      if (data == null) {
        this.timeSlots = [];
      } else {
        this.timeSlots = data;
      }
      if (this.timeSlots.length > 0) {
        this.timeSlotsExist = true;
      }
    });
  }


  getSpecificTimeSlot(userid: string, id: string) {
    this.timeSlotService.getSingleTimeSlotOfDoctor(userid, id).subscribe((data) => {
      console.log(data);
    });
    this.timeSlotService.doctorId = userid;
    this.timeSlotService.timeSlotId = id;
    this.openDialog();
  }

  addNewTimeSlot() {
    // this.timeSlotService.doctorId = this.userid;
    this.timeSlotService.timeSlotId = '';
    this.openDialog();
  }

  openDialog(): void {
    // this.onboardingService.userid = this.userid;
    const dialogRef = this.dialog.open(DoctorTimeslotComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
