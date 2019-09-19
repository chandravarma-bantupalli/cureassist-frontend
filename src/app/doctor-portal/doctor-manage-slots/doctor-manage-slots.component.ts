import { Component, OnInit } from '@angular/core';
import { TimeSlot } from 'src/app/models/time-slot';
import { MatDialog } from '@angular/material';
import { DoctorTimeslotComponent } from '../doctor-timeslot/doctor-timeslot.component';
import { TimeSlotService } from 'src/app/services/time-slot.service';

@Component({
  selector: 'app-doctor-manage-slots',
  templateUrl: './doctor-manage-slots.component.html',
  styleUrls: ['./doctor-manage-slots.component.css']
})
export class DoctorManageSlotsComponent implements OnInit {
  timeSlots: TimeSlot[];
  timeSlotsExist: boolean;
  addSlotButtonClicked = false;
  doctorId = '5d80c13d97a6e00b188dc87b';
  constructor(
    private dialog: MatDialog,
    private timeSlotService: TimeSlotService
  ) { }
  ngOnInit() {
    this.getAllDoctorTimeSlots(this.doctorId);
  }


  getAllDoctorTimeSlots(id: string) {
    this.timeSlotService.getDoctorTimeSlots(id).subscribe( (data) => {
      console.log(data);
      this.timeSlots = data;
      if (this.timeSlots.length > 0) {
        this.timeSlotsExist = true;
      }
    });
  }


  getSpecificTimeSlot(doctorId: string, id: string) {
    this.timeSlotService.getSingleTimeSlotOfDoctor(this.doctorId, id).subscribe( (data) => {
      console.log(data);
    });
    this.timeSlotService.doctorId = doctorId;
    this.timeSlotService.timeSlotId = id;
    if (id === '') {
      this.timeSlotService.timeSlotId = '';
    }
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
