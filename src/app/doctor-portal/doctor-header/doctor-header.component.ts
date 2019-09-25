import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.css']
})
export class DoctorHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private onboardingService: OnboardingService
  ) { }

  ngOnInit() {
  }
  goToHome() {
    this.router.navigate(['/doctor/home']);
  }

  goToProfile() {
    this.router.navigate(['/doctor/profile']);
  }

  manageTimeSlots() {
    this.router.navigate(['/doctor/manage/timeslots']);
  }
  viewappointments() {
    this.router.navigate(['/doctor/view']);
  }

  logout() {
    this.onboardingService.Logout();
  }

  resetpassword() {
    this.router.navigate(['onboarding/resetpassword']);
  }

}
