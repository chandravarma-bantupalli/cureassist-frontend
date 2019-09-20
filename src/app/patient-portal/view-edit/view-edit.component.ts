import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit {
  sub: any;
  emailid: any;
  patient: Patient;
  constructor(private fb: FormBuilder, public service: PatientService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.emailid = params.emailid);
   }
   formModel = this.fb.group({
    patientId: [''],
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
    this.service.getprofile(this.emailid)
    .subscribe(data => {
      console.log(data);
      this.formModel.setValue(data);
      console.log(this.formModel);
      console.log(this.patient);
    });
  }
  onsubmit() {
    this.service.updateProfile(this.emailid, this.formModel.value).subscribe(data => console.log(data));
  }
}
