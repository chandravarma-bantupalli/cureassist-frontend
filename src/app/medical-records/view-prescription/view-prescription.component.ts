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
        this.prescription = data;
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
export class BuyNow {
  healthRecord: Prescriptions;
  quantity: any;
  location: any;
  completeData: any;
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

  orderResponse() {
    this.prescriptionId = this.completeData.prescriptionId;
    this.quotationService.requestOrderResponse(this.prescriptionId);
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
  setTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        // tslint:disable-next-line:radix
        // this.minutes = parseInt((this.timeLeft / 60).toFixed());
        // this.seconds = this.timeLeft - ((this.minutes - 1) * 60);
      } else if (this.timeLeft === 0 ) {
        this.orderResponse();
      } else {
        this.timeLeft = 60;
      }
    }, 1000);
}
}
