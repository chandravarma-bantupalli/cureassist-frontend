import { Component, OnInit } from '@angular/core';
import { TimeSlot } from 'src/app/models/time-slot';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {

  appointments: any[];
  timeSlots: TimeSlot[];
  constructor() { }

  ngOnInit() {
    this.timeSlots = [
      {slotId: '1111', slotDate: '17/09/2019', slotStartTime: '09:30 AM', slotEndTime: '10:30 PM', slotCapacity: 7},
      {slotId: '1112', slotDate: '17/09/2019', slotStartTime: '11:00 AM', slotEndTime: '12:30 PM', slotCapacity: 7},
      {slotId: '1113', slotDate: '17/09/2019', slotStartTime: '02:30 PM', slotEndTime: '04:30 PM', slotCapacity: 10},
      {slotId: '1114', slotDate: '17/09/2019', slotStartTime: '05:30 AM', slotEndTime: '08:00 PM', slotCapacity: 12}
    ];
    this.appointments = [
    ];
  }

}
