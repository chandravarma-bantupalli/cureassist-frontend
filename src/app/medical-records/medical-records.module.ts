import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPrescriptionComponent } from './view-prescription/view-prescription.component';
import { ViewTestreportsComponent } from './view-testreports/view-testreports.component';



@NgModule({
  declarations: [ViewPrescriptionComponent, ViewTestreportsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ViewPrescriptionComponent,
    ViewTestreportsComponent
  ]
})
export class MedicalRecordsModule { }
