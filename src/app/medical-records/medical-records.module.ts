import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPrescriptionComponent, BuyNow } from './view-prescription/view-prescription.component';
import { ViewTestreportsComponent } from './view-testreports/view-testreports.component';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatListModule, MatExpansionModule } from '@angular/material';
import { MatDatepickerModule, MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PatientPortalModule } from '../patient-portal/patient-portal.module';
import { SimpleTimer } from 'ng2-simple-timer';



@NgModule({
  declarations: [
    ViewPrescriptionComponent,
    ViewTestreportsComponent,
    BuyNow
  ],
  imports: [
    CommonModule,
     MatCardModule,
    MatIconModule,
    MatDatepickerModule, MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    MatListModule,
    MatCheckboxModule,
    MatDialogModule,
    PatientPortalModule
  ],
  exports: [
    ViewPrescriptionComponent,
    ViewTestreportsComponent
  ],
  providers: [SimpleTimer]
})
export class MedicalRecordsModule { }
