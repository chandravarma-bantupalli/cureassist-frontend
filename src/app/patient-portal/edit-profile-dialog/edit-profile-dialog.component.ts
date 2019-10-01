import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {

  constructor(private fb: FormBuilder, public service: PatientService, public dialogRef: MatDialogRef<EditProfileDialogComponent>) { }

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
      });
  }

  onsubmit() {
    this.service.updateProfile(this.formModel.value).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    });
  }
}
