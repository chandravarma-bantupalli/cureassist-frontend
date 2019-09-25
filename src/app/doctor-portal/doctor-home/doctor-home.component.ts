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
  appointmentsExist: boolean;

  constructor(
    private onboardingService: OnboardingService,
    private timeSlotService: TimeSlotService,
    private appointmentService: AppointmentHttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userid = this.onboardingService.userid;
    // this.getAllDoctorTimeSlots(this.userid);
    this.getDayCalendarOfDoctor();
  }

  getAllDoctorTimeSlots(id: string) {
    this.timeSlotService.getDoctorTimeSlots(id).subscribe((data) => {
      console.log(data);
      this.timeSlots = data;
      this.doctorProfileExists = true;
    }, (err) => {
      console.log(err);
    });
  }

  getDayCalendarOfDoctor() {
    const date: Date = new Date();
    console.log(date + 'Todays Date');
    this.appointmentService.getDayCalendarOfUser(this.userid, date.toLocaleDateString()).subscribe( (data) => {
      console.log(this.onboardingService.userid);
      console.log(data);
      this.appointmentDayCalendar = data;
      this.todaySlots = data.slots;
      console.log(this.todaySlots);
      this.appointmentsExist = true;
    }, (err) => {
      this.appointmentsExist = false;
    });
  }

  goToProfile() {
    // this.onboardingService.userid = this.userid;
    this.router.navigate(['/doctor/update']);
  }
}
