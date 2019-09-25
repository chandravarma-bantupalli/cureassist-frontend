import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnostic-center-header',
  templateUrl: './diagnostic-center-header.component.html',
  styleUrls: ['./diagnostic-center-header.component.css']
})
export class DiagnosticCenterHeaderComponent implements OnInit {

  constructor(
    private router: Router
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

}
