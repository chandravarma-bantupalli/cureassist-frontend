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
  doctorId: any;
  timeSlots: TimeSlot[];
  timeSlotsExist: boolean;
  addSlotButtonClicked = false;
  timeSlotForm: FormGroup;
  docId: string;
  constructor(
    private dialog: MatDialog,
    private timeSlotService: TimeSlotService,
    private onboardingService: OnboardingService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    this.docId = this.timeSlotService.doctorId;
    this.getAllDoctorTimeSlots(this.onboardingService.userid);
  }

  initiateTimeSlotForm() {
    this.timeSlotForm = this.formBuilder.group({
      slotId: '',
    });
  }


  getAllDoctorTimeSlots(id: string) {
    this.timeSlotService.getDoctorTimeSlots().subscribe((data) => {
      console.log(data);
      this.timeSlots = data;
      if (this.timeSlots.length > 0) {
        this.timeSlotsExist = true;
      }
    });
  }


  getSpecificTimeSlot(doctorId: string, id: string) {
    this.timeSlotService.getSingleTimeSlotOfDoctor(this.onboardingService.userid).subscribe((data) => {
      console.log(data);
    });
    this.timeSlotService.doctorId = doctorId;
    this.timeSlotService.timeSlotId = id;
    this.openDialog();
  }

  addNewTimeSlot(docId: string) {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DoctorTimeslotComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
