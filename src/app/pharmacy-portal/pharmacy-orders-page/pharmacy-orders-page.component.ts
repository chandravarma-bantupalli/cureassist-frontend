import { Component, OnInit, NgModule } from '@angular/core';
import { QuotationService } from 'src/app/services/quotation.service';
import { Quotation } from 'src/app/models/quotation';
import { PrescribedMedicine } from 'src/app/models/prescribed-medicine';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Prescriptions } from 'src/app/models/prescriptions';
import { BrowserModule } from '@angular/platform-browser';
import {ThemePalette} from '@angular/material/core';
import { Pharmacy } from 'src/app/models/pharmacy';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-pharmacy-orders-page',
  templateUrl: './pharmacy-orders-page.component.html',
  styleUrls: ['./pharmacy-orders-page.component.css']
})

@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule
  ]
})

export class PharmacyOrdersPageComponent implements OnInit {
  displayedColumns: string[] = ['MedicineName', 'PrescribedDosage', 'Quantity', 'MedicinePrice'];
  selectedQuotationObject: Quotation;
  quotationRequests: Quotation[];
  singleQuotation: Quotation;
  // patientDetail: Prescriptions;
  prescribedMedicines: PrescribedMedicine[];
  pharmacyResponse: Quotation;
  MedicinePrice = 0;
  totalCost = 0;
  pharmacistDetails: Pharmacy;

  constructor(private quotationService: QuotationService, private pharmacyService: PharmacyService) {
    this.quotationRequests = [];
  }

  onQuotationRequestSelected(quotationObject) {
    this.selectedQuotationObject = quotationObject;
  }

  ngOnInit() {
    this.pharmacyService.getPharmacy().subscribe(data => {this.pharmacistDetails = data;
                                                          this.quotationService.pharmacyOnline(this.pharmacistDetails.pharmacyPincode);
                                                          console.log('got pharmacy pincode', this.pharmacistDetails.pharmacyPincode);
    });
    this.quotationService.quotationRequests.subscribe((quotation: any) => {
      if (quotation === '') {
        console.log('incoming string is null');
      } else {
        console.log(quotation, 'prescription from patient');
        this.singleQuotation = quotation;
        console.log(this.singleQuotation.prescribedMedicines);
        this.quotationRequests.push(quotation);
      }
    });
  }

  totalMedicineCost(medicineName, medicinePrice) {
    // tslint:disable-next-line:radix
    this.totalCost = this.totalCost + parseInt(medicinePrice.target.value);
    console.log(medicineName, this.singleQuotation.prescribedMedicines);
    this.singleQuotation.prescribedMedicines = this.singleQuotation.prescribedMedicines.map(
      e => {
        if (e.medicineName === medicineName) {
          // tslint:disable-next-line:radix
          e.medicinePrice = parseInt(medicinePrice.target.value);
        }
        console.log(this.singleQuotation.prescribedMedicines);
        return e;
      }
    );

    console.log(this.totalCost);
  }
  finalMedicineCost(medicineName, medicinePrice) {
    if (this.totalCost !== 0) {
      // tslint:disable-next-line:radix
      this.totalCost = this.totalCost +
        // tslint:disable-next-line:radix
        parseInt((parseInt(medicinePrice.target.value) / 10).toFixed()) - parseInt(medicinePrice.target.value);
      this.singleQuotation.prescribedMedicines = this.singleQuotation.prescribedMedicines.map(
        e => {
          if (e.medicineName === medicineName) {
            // tslint:disable-next-line:radix
            e.medicinePrice = parseInt(medicinePrice.target.value);
          }
          console.log(this.singleQuotation.prescribedMedicines);
          return e;
        }
      );
    }
    console.log(this.totalCost);
  }
  pharmacyResponseMethod(totalCost) {
    console.log(this.singleQuotation.prescriptionId);
    this.singleQuotation.totalCost = totalCost;
    console.log(this.singleQuotation.totalCost);
    this.quotationService.sendQuotation(this.singleQuotation);

  }

}
