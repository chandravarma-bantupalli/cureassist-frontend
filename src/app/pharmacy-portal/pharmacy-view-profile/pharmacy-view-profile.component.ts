import { Component, OnInit } from '@angular/core';
import { Pharmacy } from 'src/app/models/pharmacy';
import { ActivatedRoute, Router } from '@angular/router';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pharmacy-view-profile',
  templateUrl: './pharmacy-view-profile.component.html',
  styleUrls: ['./pharmacy-view-profile.component.css']
})
export class PharmacyViewProfileComponent implements OnInit {
  pharmacy: Pharmacy;
  sub: any;
  Email: any;

  constructor(private fb: FormBuilder, public service: PharmacyService) {
  }
  formModel = this.fb.group({
    pharmacyId: [''],
    pharmacyName: [''],
    pharmacyRegisterNumber: [''],
    pharmacyLocation: [''],
    emailId: [''],
    phoneNumber: ['']
   });
  ngOnInit() {
    this.service.getPharmacy()
      .subscribe(data => {
        // console.log(data);
        this.formModel.setValue(data); console.log(this.formModel.value);
        // console.log(this.pharmacy);
      });
  }
  onsubmit(): void {
    this.service.updateprofile(this.formModel.value).subscribe();
  }

}
