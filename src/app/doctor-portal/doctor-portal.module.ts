import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorHeaderComponent } from './doctor-header/doctor-header.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { DoctorManageSlotsComponent } from './doctor-manage-slots/doctor-manage-slots.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorUpdateProfileComponent } from './doctor-update-profile/doctor-update-profile.component';
// tslint:disable-next-line: max-line-length
import { MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatGridListModule, MatCardModule, MatExpansionModule } from '@angular/material';



@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [DoctorHeaderComponent, DoctorHomeComponent, DoctorManageSlotsComponent, DoctorProfileComponent, DoctorUpdateProfileComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatExpansionModule
  ],
  exports: [
   DoctorHeaderComponent,
   DoctorHomeComponent,
   DoctorProfileComponent,
   DoctorUpdateProfileComponent,
   DoctorManageSlotsComponent
  ]
})
export class DoctorPortalModule { }
