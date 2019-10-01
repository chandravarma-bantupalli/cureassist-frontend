import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit {
  @Input() detailType: string;
  sub: any;
  emailid: any;
  patient: Patient;
  constructor(public dialog: MatDialog, private fb: FormBuilder, public service: PatientService) {
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

  get patientName() {
    return `${this.formModel.get('firstName').value} ${this.formModel.get('lastName').value}`;
  }

  get emailId() {
    return `${this.formModel.get('email').value}`;
  }

  get phoneNumber() {
    return `${this.formModel.get('phoneNumber').value}`;
  }

  get emergencyContactNumber() {
    return `${this.formModel.get('emergencyContactNumber').value}`;
  }
  get dateOfBirth() {
    return `${this.formModel.get('dateOfBirth').value}`;
  }
  get bloodGroup() {
    return `${this.formModel.get('bloodGroup').value}`;
  }
  get uaid() {
    return `${this.formModel.get('uaid').value}`;
  }


  ngOnInit() {
    this.service.getprofile()
      .subscribe(data => {
        console.log(data);
        this.formModel.setValue(data);
        console.log(this.formModel);
        this.patient = data;
        console.log(this.patient);
      });
  }

  onUpdate() {
    this.dialog.open(EditProfileDialogComponent, {
      width: '50vw',
      height: '80vh'
    });
  }

  onsubmit() {
    this.service.updateProfile(this.formModel.value).subscribe(data => console.log(data));
  }
}
