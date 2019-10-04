import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { Prescriptions } from '../../models/prescriptions';
import { HealthrecordsService } from '../../services/healthrecords.service';
import { ActivatedRoute } from '@angular/router';
import { OnboardingService } from '../../services/onboarding.service';
import { QuotationService } from 'src/app/services/quotation.service';
import { Quotation } from 'src/app/models/quotation';
import { FormControl } from '@angular/forms';


// import { QueryValueType } from '@angular/compiler/src/core';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.css']
})
export class ViewPrescriptionComponent implements OnInit {
  panelOpenState = false;
  patientid: string;
  prescription: any;
  selectedPrescription: Prescriptions;
  contentEditable: boolean;
  medicinename: any;
  quantity: any;
  location: any;
  medicine: any;
  constructor(
    private dialog: MatDialog,
    private healthrecord: HealthrecordsService,
    private route: ActivatedRoute, private onboardservice: OnboardingService
  ) {
    this.route.params.subscribe(params => (this.patientid = params.patientid));
  }
  ngOnInit() {
    this.healthrecord
      .getPatientPrescriptions(this.onboardservice.userid)
      .subscribe((data) => {
        this.prescription = data; console.log(this.prescription)
        this.prescription = this.prescription.map(e => {
          e.selectedMeds = [];
          return e;
        });
      });
  }
  openDialog(prescription) {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(BuyNow, {
      width: '250px',
      // tslint:disable-next-line: whitespace
      data: { prescription }
    });
    this.healthrecord.prescription = prescription;
  }
  pushMeds(mat) {
    console.log(mat);
  }
}
@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.html',
  providers: [ViewPrescriptionComponent]
})
// tslint:disable-next-line:component-class-suffix
export class BuyNow implements OnInit {
  healthRecord: Prescriptions;
  quantity = new FormControl();
  location: any;
  orderQuotation: Quotation;
  completeData: any;
  reply: string;
  pincode: any;
  // tslint:disable-next-line:no-inferrable-types
  timeLeft: number = 60;
  prescriptionId: string;
  interval;
  constructor(
    private quotationService: QuotationService,
    private service: HealthrecordsService,
    public dialogRef: MatDialogRef<BuyNow>,
    @Inject(MAT_DIALOG_DATA) public data: Prescriptions,
    myhealthrecord: ViewPrescriptionComponent
  ) {
    // this.healthRecord = myhealthrecord.returnHealthRecord();
    console.log(this.service.prescription);
    console.log(data);
    this.completeData = data;
  }

  ngOnInit() {
    this.quotationService.finalQuotation.subscribe((quotation: any) => {
      if (quotation === '') {
        console.log('incoming quotation is null');
      } else {
        // console.log(quotation);
        this.orderQuotation = quotation;
        console.log(this.orderQuotation, 'got slip');
      }
    });
  }
  orderResponse() {
    this.prescriptionId = this.completeData.prescription.prescriptionId;
    this.quotationService.requestOrderResponse(this.prescriptionId);
    console.log(this.prescriptionId);
    // this.quotationService.finalQuotation.subscribe(data => console.log(data));
  }

  save() {
    this.service.sendprescriptiontopharmacy(this.completeData).subscribe(data => console.log(data));
  }
  close() {
    this.dialogRef.close();
  }

  addquantity(quantity, name) {
    console.log(quantity);
    console.log(this.completeData);
    this.completeData.prescription.selectedMeds = this.completeData.prescription.selectedMeds.map(
      e => {
        if (e.medicineName === name) {
          e.medicineQuantity = quantity;
        }
        return e;
      }
    );
  }
  addlocation(location) {
    console.log(location);
    console.log(this.completeData.prescription);
    // this.completeData.prescription = this.completeData.prescription.map(e => {
    //     e.location = location
    this.completeData.prescription.location = location;
  }
  addpincode(pincode) {
    console.log(this.completeData.prescription);
    this.completeData.prescription.pincode = pincode;
  }
  setTimer() {
    this.interval = setTimeout(() => {
      this.orderResponse.bind(this)();
      if (this.timeLeft > 0) {
        this.timeLeft--;
        // tslint:disable-next-line:radix
        // this.minutes = parseInt((this.timeLeft / 60).toFixed());
        // this.seconds = this.timeLeft - ((this.minutes - 1) * 60);
      } else if (this.timeLeft === 0 ) {
      } else {
        this.timeLeft = 60;
      }
    }, 40000);
}
}
