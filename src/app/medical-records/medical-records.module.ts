import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPrescriptionComponent, BuyNow } from './view-prescription/view-prescription.component';
import { ViewTestreportsComponent, ViewReport } from './view-testreports/view-testreports.component';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatListModule, MatExpansionModule, MatTableModule } from '@angular/material';
import { MatDatepickerModule, MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PatientPortalModule } from '../patient-portal/patient-portal.module';
import { CdkTableModule } from '@angular/cdk/table';
import { NgxDocViewerModule } from 'ngx-doc-viewer';


@NgModule({
  declarations: [
    ViewPrescriptionComponent,
    ViewTestreportsComponent,
    BuyNow,
    ViewReport
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
    PatientPortalModule,
    MatTableModule,
    CdkTableModule,
    NgxDocViewerModule
  ],
  exports: [
    ViewPrescriptionComponent,
    ViewTestreportsComponent
  ]
})
export class MedicalRecordsModule { }
