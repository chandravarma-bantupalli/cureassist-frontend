import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Doctor } from '../../models/doctor';
import { Router } from '@angular/router';
import { DoctorHttpService } from '../../services/doctor-http.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { TimeSlot } from 'src/app/models/time-slot';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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
  specialization: string[] = ['General Physician', 'Cardiologist',
  'Ear, Nose and Throat', 'Gastroenterologist', 'Dermatologist', 'Neurologist', 'Gynaecologist', 'Psychiatrist']
  filteredSpecialization: Observable<string[]>;

  constructor(
    private router: Router,
    private onboardingService: OnboardingService,
    private doctorService: DoctorHttpService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DoctorUpdateProfileComponent>
  ) { }

  ngOnInit() {
    // this.userid = '4a030b89-84f7-4fc5-9010-c00a0f3a6b21';
    this.userid = this.onboardingService.userid;
    this.initializeDoctorProfileForm();
    this.getDoctorProfile(this.userid);
    this.filteredSpecialization = this.doctorProfile.controls.doctorSpecialization.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterSpecialization(value)));
  }
  private _filterSpecialization(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.specialization.filter(option => option.toLowerCase().includes(filterValue));
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
      }, (err) => {
        console.log(err);
      });
      // this.onboardingService.userid = this.userid;
    } else {
      const doctor: Doctor = this.doctorProfile.value;
      doctor.userid = this.userid;
      doctor.doctorSlots = [];
      this.doctorService.addNewDoctor(doctor).subscribe( (res) => {
        console.log(doctor);
        console.log(res);
        this.dialogRef.close();
      });
      // this.onboardingService.userid = this.userid;
      // this.router.navigate(['/doctor/manage/timeslots']);
    }
  }
}
