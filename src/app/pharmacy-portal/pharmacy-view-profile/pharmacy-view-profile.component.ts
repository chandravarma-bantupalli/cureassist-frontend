import { Component, OnInit, Input } from '@angular/core';
import { Pharmacy } from 'src/app/models/pharmacy';
import { ActivatedRoute, Router } from '@angular/router';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { PharmacyEditProfileDialogComponent } from '../pharmacy-edit-profile-dialog/pharmacy-edit-profile-dialog.component';

@Component({
  selector: 'app-pharmacy-view-profile',
  templateUrl: './pharmacy-view-profile.component.html',
  styleUrls: ['./pharmacy-view-profile.component.css']
})
export class PharmacyViewProfileComponent implements OnInit {
  @Input() detailType: string;
  pharmacy: Pharmacy;
  sub: any;
  Email: any;

  constructor(public dialog: MatDialog, private fb: FormBuilder, public service: PharmacyService) {
  }
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

  ngOnInit() {
    this.service.getPharmacy()
      .subscribe(data => {
        console.log(data);
        this.formModel.setValue(data);
        console.log(this.formModel);
        this.pharmacy = data;
        console.log(this.pharmacy);
      });
  }

  onsubmit() {
    this.service.updateprofile(this.formModel.value).subscribe(data => console.log(data));
  }

  onUpdate() {
    this.dialog.open(PharmacyEditProfileDialogComponent, {
      width: '50vw',
      height: '80vh'
    });
  }
}
