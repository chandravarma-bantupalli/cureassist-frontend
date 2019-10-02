import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../../models/time-slot';
import { TimeSlotService } from '../../services/time-slot.service';
import { OnboardingService } from '../../services/onboarding.service';
import { Router } from '@angular/router';
import { AppointmentHttpService } from 'src/app/services/appointment-http.service';
import { AppointmentDayCalendar } from '../../models/appointment';
import { AppointmentSlot } from '../../models/appointment';
import { DoctorHttpService } from 'src/app/services/doctor-http.service';
import { Doctor } from 'src/app/models/doctor';
import { ResetpasswordComponent } from 'src/app/onboarding/resetpassword/resetpassword.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css'],
})
export class DoctorHomeComponent implements OnInit {
  appointments: any[];
  timeSlots: TimeSlot[];
  userid: string; // = this.onboardingService.userid;
  doctorProfileExists: boolean;
  timeSlotsExistForDoctor: boolean;
  appointmentDayCalendar: AppointmentDayCalendar;
  todaySlots: AppointmentSlot[];
  appointmentsExist: boolean;
  doctorProfile: Doctor;

  constructor(
    private onboardingService: OnboardingService,
    private timeSlotService: TimeSlotService,
    private appointmentService: AppointmentHttpService,
    private doctorService: DoctorHttpService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    console.log(this.onboardingService.userid);
    this.userid = this.onboardingService.userid;
    console.log(this.userid);
    this.getDoctorProfile(this.userid);
    this.getDayCalendarOfDoctor();
  }

  getDoctorProfile(id: string) {
    this.doctorService.getDoctorById(id).subscribe( (data) => {
      console.log(data);
      if (data == null) {
        this.doctorProfileExists = false;
      } else {
        this.doctorProfile = data;
        this.getAllDoctorTimeSlots(this.doctorProfile.userid);
        if (this.doctorProfile.ts == null) {
          this.doctorProfile.ts = [];
          this.doctorProfile.doctorSlots = [];
        }
        this.timeSlots = this.doctorProfile.doctorSlots;
      }
    }, (err) => {
      console.log(err);
    });
  }

  getAllDoctorTimeSlots(id: string) {
    this.timeSlotService.getDoctorTimeSlots(id).subscribe((data) => {
      console.log(data);
      if (data == null) {
        this.timeSlots = [];
        this.timeSlotsExistForDoctor = false;
      } else {
        this.timeSlots = data;
        this.timeSlotsExistForDoctor = true;
      }
      console.log(this.timeSlots);
      this.doctorProfileExists = true;
    }, (err) => {
      console.log(err);
      this.appointmentsExist = true;
    });
  }

  getDayCalendarOfDoctor() {
    const date: Date = new Date();
    console.log(date + 'Todays Date');
    // this.appointmentService.getDayCalendarOfUser(this.userid, date.toLocaleDateString()).subscribe( (data) => {
    //   console.log(this.onboardingService.userid);
    //   console.log(data);
    //   this.appointmentDayCalendar = data;
    //   this.todaySlots = data.slots;
    //   console.log(this.todaySlots);
    //   this.appointmentsExist = true;
    //   this.doctorProfileExists = true;
    // }, (err) => {
    //   this.appointmentsExist = false;
    //   this.doctorProfileExists = true;
    // });
  }

  manageTimeSlots() {
    this.router.navigate(['/doctor/manage/timeslots']);
  }

  goToProfile() {
     this.onboardingService.userid = this.userid;
     this.router.navigate(['/doctor/update']);
  }

  resetpassword() {
    this.dialog.open(ResetpasswordComponent, {
      width: '30vw',
      height: '70vh'
    });
  }

  logout() {
    return this.onboardingService.Logout();
  }
}
