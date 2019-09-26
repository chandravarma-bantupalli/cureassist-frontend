import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-diagnostic-center-header',
  templateUrl: './diagnostic-center-header.component.html',
  styleUrls: ['./diagnostic-center-header.component.css']
})
export class DiagnosticCenterHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private onboardingService: OnboardingService
  ) { }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(['/diagnosisCenter/home']);
  }

  goToProfile() {
    this.router.navigate(['/diagnosisCenter/profile']);
  }

  manageTimeSlots() {
    this.router.navigate(['/diagnosisCenter/manage/timeslots']);
  }

  goToAppointments() {
    this.router.navigate(['/diagnosisCenter/view']);
  }

  logout() {
    this.onboardingService.Logout();
  }

  resetpassword() {
    this.router.navigate(['onboarding/resetpassword']);
  }

}
