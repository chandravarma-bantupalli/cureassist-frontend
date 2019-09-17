import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
 private router: Router;

  constructor() { }

  ngOnInit() {
  }
  goToUpdateProfile() {
    this.router.navigate(['/doctor/update']);
  }

  goToManageSlots() {
    this.router.navigate(['/doctor/manage/timeslots']);
  }
}
