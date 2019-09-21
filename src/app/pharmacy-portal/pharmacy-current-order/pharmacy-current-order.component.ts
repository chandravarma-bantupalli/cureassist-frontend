import { Component, OnInit } from '@angular/core';
import { Quotation } from 'src/app/models/quotation';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pharmacy-current-order',
  templateUrl: './pharmacy-current-order.component.html',
  styleUrls: ['./pharmacy-current-order.component.css']
})
export class PharmacyCurrentOrderComponent implements OnInit {

  quotationRequests: Quotation[];
  orderRequests: any[];

  constructor(
    private service: PharmacyService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.quotationRequests = [];
  }

  ngOnInit() {
  }

  sendResponse() {
    // this.signalRService.sendQuotation(, this.quotationForm.value);
  }

}
