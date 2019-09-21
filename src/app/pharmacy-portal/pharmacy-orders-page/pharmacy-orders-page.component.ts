import { Component, OnInit } from '@angular/core';
import { Quotation } from 'src/app/models/quotation';
import { PrescribedMedicine } from 'src/app/models/prescribed-medicine';
import { QuotationService } from 'src/app/services/quotation.service';

@Component({
  selector: 'app-pharmacy-orders-page',
  templateUrl: './pharmacy-orders-page.component.html',
  styleUrls: ['./pharmacy-orders-page.component.css']
})
export class PharmacyOrdersPageComponent implements OnInit {
  displayedColumns: string[] = ['MedicineName', 'PrescribedDosage', 'Quantity', 'MedicinePrice'];
  selectedQuotationObject: Quotation;
  quotationRequests: Quotation[];
  singleQuotation: Quotation;
  prescribedMedicines: PrescribedMedicine[];

  constructor(private quotationService: QuotationService) {
    this.quotationRequests = [];
  }

  onQuotationRequestSelected(quotationObject) {
    this.selectedQuotationObject = quotationObject;
  }

  ngOnInit() {
    this.quotationService.quotationRequests.subscribe((quotation: any) => {
      if (quotation === '') {
        console.log('incoming string is null');
      } else {
        console.log(quotation);
        this.singleQuotation = quotation;
        console.log(this.singleQuotation.prescribedMedicines);
        this.quotationRequests.push(quotation);
      }
    });
  }
  sendResponse(totalCost) {
    this.selectedQuotationObject.totalPrice = totalCost;
    this.quotationService.sendQuotation(this.selectedQuotationObject);
  }

}
