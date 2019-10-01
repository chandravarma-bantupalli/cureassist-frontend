import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pharmacy-edit-profile-dialog',
  templateUrl: './pharmacy-edit-profile-dialog.component.html',
  styleUrls: ['./pharmacy-edit-profile-dialog.component.css']
})
export class PharmacyEditProfileDialogComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, public service: PharmacyService, public dialogRef: MatDialogRef<PharmacyEditProfileDialogComponent>) { }

  formModel = this.fb.group({
    pharmacyId: [''],
    pharmacyName: [''],
    pharmacyLocation: [''],
    pharmacyPincode: [''],
    pharmacyRegisterNumber: [''],
    phoneNumber: [''],
    emailId: ['']
   });

  get emailId() {
    return `${this.formModel.get('emailId').value}`;
  }

  get phoneNumber() {
    return `${this.formModel.get('phoneNumber').value}`;
  }

  get pharmacyName() {
    return `${this.formModel.get('pharmacyName').value}`;
  }

  get pharmacyRegisterNumber() {
    return `${this.formModel.get('pharmacyRegisterNumber').value}`;
  }

  get pharmacyLocation() {
    return `${this.formModel.get('pharmacyLocation').value}`;
  }

  get pharmacyPincode() {
    return `${this.formModel.get('pharmacyPincode').value}`;
  }

  ngOnInit() {
    this.service.getPharmacy()
      .subscribe(data => {
        console.log(data);
        this.formModel.setValue(data);
        console.log(this.formModel);
      });
  }

  onsubmit() {
    this.service.updateprofile(this.formModel.value).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    });
  }
}
