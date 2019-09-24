import { Component, OnInit } from '@angular/core';
import { QuotationService } from 'src/app/services/quotation.service';
import { Prescriptions } from 'src/app/models/prescriptions';


@Component({
  selector: 'app-pharmacy-confirm-orders',
  templateUrl: './pharmacy-confirm-orders.component.html',
  styleUrls: ['./pharmacy-confirm-orders.component.css']
})
export class PharmacyConfirmOrdersComponent implements OnInit {
  patientDetail: Prescriptions;
  confirmOrdersDetails: Prescriptions[] = [];

  constructor(private quotationService: QuotationService) { }

  ngOnInit() {
    this.quotationService.patientDetails.subscribe((details: any) => {
      if (details === '') {
        console.log('no details');
      } else {
        this.patientDetail = details;
        console.log(this.patientDetail, 'got details');
        this.confirmOrdersDetails.push(this.patientDetail);
      }
    });
  }

}
