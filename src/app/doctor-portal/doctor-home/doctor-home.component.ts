import { Component, OnInit } from '@angular/core';
import { TimeSlot } from 'src/app/models/time-slot';
import { TimeSlotService } from 'src/app/services/time-slot.service';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {
  appointments: any[];
  timeSlots: TimeSlot[];
  doctorId: string; // = this.onboardingService.userid;
  constructor(
    private onboardingService: OnboardingService,
    private timeSlotService: TimeSlotService
  ) { }

  ngOnInit() {
    this.doctorId = this.onboardingService.userid;
    this.getAllDoctorTimeSlots(this.doctorId);
    this.appointments = [
    ];
  }
  getAllDoctorTimeSlots(id: string) {
    this.timeSlotService.getDoctorTimeSlots().subscribe( (data) => {
      console.log(data);
      this.timeSlots = data;
    });
  }
}
