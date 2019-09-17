import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatExpansionModule } from '@angular/material';
import { MatListModule, MatGridListModule, MatCardModule } from '@angular/material';

import { DiagnosticCenterHeaderComponent } from './diagnostic-center-header/diagnostic-center-header.component';
import { DiagnosticCenterHomeComponent } from './diagnostic-center-home/diagnostic-center-home.component';
import { DiagnosticCenterProfileComponent } from './diagnostic-center-profile/diagnostic-center-profile.component';
import { DiagnosticCenterUpdateProfileComponent } from './diagnostic-center-update-profile/diagnostic-center-update-profile.component';
import { DiagnosticCenterManageSlotsComponent } from './diagnostic-center-manage-slots/diagnostic-center-manage-slots.component';



@NgModule({
  declarations: [
    DiagnosticCenterHeaderComponent,
    DiagnosticCenterHomeComponent,
    DiagnosticCenterProfileComponent,
    DiagnosticCenterUpdateProfileComponent,
    DiagnosticCenterManageSlotsComponent
  ],
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
    DiagnosticCenterHeaderComponent,
    DiagnosticCenterHomeComponent,
    DiagnosticCenterProfileComponent,
    DiagnosticCenterUpdateProfileComponent,
    DiagnosticCenterManageSlotsComponent
  ]
})
export class DiagnosisCenterPortalModule { }
