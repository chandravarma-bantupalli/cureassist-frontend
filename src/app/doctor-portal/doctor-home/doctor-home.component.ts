import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../../models/time-slot';
import { TimeSlotService } from '../../services/time-slot.service';
import { OnboardingService } from '../../services/onboarding.service';
import { Router } from '@angular/router';
import { AppointmentHttpService } from 'src/app/services/appointment-http.service';
import { AppointmentDayCalendar } from '../../models/appointment';
import { AppointmentSlot } from '../../models/appointment';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {
  appointments: any[];
  timeSlots: TimeSlot[];
  userid: string; // = this.onboardingService.userid;
  doctorProfileExists: boolean;
  appointmentDayCalendar: AppointmentDayCalendar;
  todaySlots: AppointmentSlot[];

  constructor(
    private onboardingService: OnboardingService,
    private timeSlotService: TimeSlotService,
    private appointmentService: AppointmentHttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userid = this.onboardingService.userid;
    this.getAllDoctorTimeSlots(this.userid);
    this.getDayCalendarOfDoctor();
  }

  getAllDoctorTimeSlots(id: string) {
    this.timeSlotService.getDoctorTimeSlots(id).subscribe((data) => {
      console.log(data);
      this.timeSlots = data;
      this.doctorProfileExists = true;
    }, (err) => {
      console.log(err);
      this.doctorProfileExists = false;
    });
  }

  getDayCalendarOfDoctor() {
    const date = new Date();
    this.appointmentService.getDayCalendarOfUser('user123456', date.toLocaleDateString()).subscribe( (data) => {
      this.appointmentDayCalendar = data;
      this.todaySlots = this.appointmentDayCalendar.slots;
      console.log(this.todaySlots);
      this.doctorProfileExists = true;
    }, (err) => {
      this.doctorProfileExists = false;
    });
  }

  goToProfile() {
    // this.onboardingService.userid = this.userid;
    this.router.navigate(['/doctor/update']);
  }
}
