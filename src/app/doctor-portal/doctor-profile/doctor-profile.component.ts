import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../../models/doctor';
import { TimeSlot } from '../../models/time-slot';
import { DoctorHttpService } from '../../services/doctor-http.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  doctor: Doctor;
  timeslots: TimeSlot[];
  constructor(
    private router: Router,
    private doctorService: DoctorHttpService
  ) { }

  ngOnInit() {
    this.getDoctorProfile();
  }
  getDoctorProfile() {
    this.doctor = new Doctor();
    this.doctorService.getDoctorById().subscribe( (data) => {
      this.doctor = data;
    });
  }
  goToUpdateProfile() {
    this.router.navigate(['/doctor/update']);
  }

  goToManageSlots() {
    this.router.navigate(['/doctor/manage/timeslots']);
  }
}
