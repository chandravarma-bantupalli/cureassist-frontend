import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Doctor } from '../../models/doctor';
import { Router } from '@angular/router';
import { DoctorHttpService } from '../../services/doctor-http.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { TimeSlot } from 'src/app/models/time-slot';

@Component({
  selector: 'app-doctor-update-profile',
  templateUrl: './doctor-update-profile.component.html',
  styleUrls: ['./doctor-update-profile.component.css']
})
export class DoctorUpdateProfileComponent implements OnInit {
  doctorProfile: FormGroup;
  doctor: Doctor;
  userid: string;
  doctorProfileExists: boolean;

  constructor(
    private router: Router,
    private onboardingService: OnboardingService,
    private doctorService: DoctorHttpService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.userid = this.onboardingService.userid;
    this.initializeDoctorProfileForm();
    this.getDoctorProfile(this.userid);
  }
  initializeDoctorProfileForm() {
    this.doctorProfile = this.formBuilder.group({
      ts: '',
      doctorId: '',
      userid: '',
      doctorFirstName: '',
      doctorLastName: '',
      doctorEmail: '',
      doctorPhoneNumber: '',
      doctorCity: '',
      doctorAddress: '',
      pincode: '',
      doctorRegNum: '',
      doctorExperience: '',
      doctorSpecialization: '',
      doctorSlots: ''
    });
  }

  getDoctorProfile(userid: string) {
    this.doctorService.getDoctorById(userid).subscribe((data) => {
      this.doctorProfile.setValue(data);
      this.doctor = data;
      this.doctorProfileExists = true;
    }, (err) => {
      console.log(err);
      this.doctorProfileExists = false;
    });
  }

  goToManageSlots() {
    this.onboardingService.userid = this.userid;
    this.router.navigate(['/doctor/manage/timeslots']);
  }

  saveProfile() {
    if (this.doctorProfileExists) {
      const doctor: Doctor = this.doctorProfile.value;
      console.log(doctor);
      doctor.doctorSlots = this.doctor.doctorSlots;
      // setting the above values to previous because, these are updated only during the CRUD operations on Time Slots.
      this.doctorService.updateDoctor(this.userid, doctor).subscribe((res) => {
        console.log(res);
      });
      // this.onboardingService.userid = this.userid;
      this.router.navigate(['/doctor/profile']);
    } else {
      const doctor: Doctor = this.doctorProfile.value;
      doctor.userid = this.userid;
      doctor.doctorSlots = [];

      this.doctorService.addNewDoctor(doctor).subscribe( (res) => {
        console.log(doctor);
        console.log(res);
      });
      // this.onboardingService.userid = this.userid;
      this.router.navigate(['/doctor/manage/timeslots']);
    }
  }
}
