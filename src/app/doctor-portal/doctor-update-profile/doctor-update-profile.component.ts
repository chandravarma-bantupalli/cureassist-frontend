import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Doctor } from 'src/app/Models/doctor';
import { Router } from '@angular/router';
import { DoctorHttpService } from 'src/app/services/doctor-http.service';

@Component({
  selector: 'app-doctor-update-profile',
  templateUrl: './doctor-update-profile.component.html',
  styleUrls: ['./doctor-update-profile.component.css']
})
export class DoctorUpdateProfileComponent implements OnInit {
  doctorProfile: FormGroup;
  doctor: Doctor;
  constructor(private router: Router,
              private doctorService: DoctorHttpService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeDoctorProfileForm();
    this.getDoctorProfile();
  }
  initializeDoctorProfileForm() {
    this.doctorProfile = this.formBuilder.group({
      ts: '',
      doctorId: '',
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

  getDoctorProfile() {
    this.doctorService.getDoctorById().subscribe( (data) => {
      this.doctorProfile.setValue(data);
      this.doctor = data;
    });
  }

  saveProfile() {
    const doctor: Doctor = this.doctorProfile.value;
    console.log(doctor);
    doctor.doctorSlots = this.doctor.doctorSlots;
    // setting the above values to previous because, these are updated only during the CRUD operations on Time Slots.
    this.doctorService.updateDoctor(doctor).subscribe( (res) => {
      console.log(res);
    });
    this.router.navigate(['/doctor/profile']);
  }
}
