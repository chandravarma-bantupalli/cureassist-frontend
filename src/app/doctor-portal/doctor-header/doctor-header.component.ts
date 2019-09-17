import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.css']
})
export class DoctorHeaderComponent implements OnInit {

  constructor(private router: Router) { }

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
}
