import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../../models/time-slot';
import { TimeSlotService } from '../../services/time-slot.service';
import { OnboardingService } from '../../services/onboarding.service';
import { Router } from '@angular/router';

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

  constructor(
    private onboardingService: OnboardingService,
    private timeSlotService: TimeSlotService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userid = this.onboardingService.userid;
    this.getAllDoctorTimeSlots(this.userid);
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

  goToProfile() {
    this.onboardingService.userid = this.userid;
    this.router.navigate(['/doctor/update']);
  }
}
