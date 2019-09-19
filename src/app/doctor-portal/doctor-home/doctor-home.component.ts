import { Component, OnInit } from '@angular/core';
import { TimeSlot } from 'src/app/models/time-slot';
import { TimeSlotService } from 'src/app/services/time-slot.service';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {
  appointments: any[];
  timeSlots: TimeSlot[];
  doctorId = '5d80c13d97a6e00b188dc87b';
  constructor(private timeSlotService: TimeSlotService) { }

  ngOnInit() {
    this.getAllDoctorTimeSlots(this.doctorId);
    this.appointments = [
    ];
  }
  getAllDoctorTimeSlots(id: string) {
    this.timeSlotService.getDoctorTimeSlots(id).subscribe( (data) => {
      console.log(data);
      this.timeSlots = data;
    });
  }
}
