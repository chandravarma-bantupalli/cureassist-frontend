import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ResetpasswordComponent } from '../../onboarding/resetpassword/resetpassword.component';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-dc-appointment-history',
  templateUrl: './dc-appointment-history.component.html',
  styleUrls: ['./dc-appointment-history.component.css']
})
export class DcAppointmentHistoryComponent implements OnInit {

  isHomePage: boolean;
  appointmentHistoryPage: boolean;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private onboardingService: OnboardingService
  ) { }

  ngOnInit() {
    this.isHomePage = false;
    this.appointmentHistoryPage = true;
  }

  goToHome() {
    this.router.navigate(['/diagnosisCenter/home']);
  }

  viewAllAppointments() {
    this.router.navigate(['/diagnosisCenter/appointments/history']);
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
