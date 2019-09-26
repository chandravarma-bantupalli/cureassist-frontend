import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../../models/doctor';
import { TimeSlot } from '../../models/time-slot';
import { DoctorHttpService } from '../../services/doctor-http.service';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  doctor: Doctor;
  timeslots: TimeSlot[];
  userid: string;
  docName: string;

  constructor(
    private router: Router,
    private doctorService: DoctorHttpService,
    private onboardingService: OnboardingService
  ) { }

  ngOnInit() {
    // this.userid = this.onboardingService.userid;
    this.userid = '4a030b89-84f7-4fc5-9010-c00a0f3a6b21';
    this.getDoctorProfile(this.userid);
  }

  getDoctorProfile(id: string) {
    this.doctor = new Doctor();
    this.doctorService.getDoctorById(id).subscribe((data) => {
      this.doctor = data;
      this.docName = this.doctor.doctorFirstName + ' ' + this.doctor.doctorLastName;
    });
  }

  goToUpdateProfile() {
    // this.onboardingService.userid = this.userid;
    this.router.navigate(['/doctor/update']);
  }

  goToManageSlots() {
    // this.onboardingService.userid = this.userid;
    this.router.navigate(['/doctor/manage/timeslots']);
  }
}
