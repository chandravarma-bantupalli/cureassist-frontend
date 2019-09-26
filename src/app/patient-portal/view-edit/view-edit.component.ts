import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit {
  sub: any;
  emailid: any;
  patient: Patient;
  constructor(private fb: FormBuilder, public service: PatientService) {
   }
   formModel = this.fb.group({
    patientId: [''],
    userId: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: [''],
    bloodGroup: [''],
    uaid: [''],
    email: [''],
    phoneNumber: [''],
    emergencyContactNumber: [''],
    gender: ['', Validators.required],
    city: ['', Validators.required]
  });

  ngOnInit() {
    this.service.getprofile()
    .subscribe(data => {
      console.log(data);
      this.formModel.setValue(data);
      console.log(this.formModel);
      console.log(this.patient);
    });
  }
  onsubmit() {
    this.service.updateProfile(this.formModel.value).subscribe(data => console.log(data));
  }
}
