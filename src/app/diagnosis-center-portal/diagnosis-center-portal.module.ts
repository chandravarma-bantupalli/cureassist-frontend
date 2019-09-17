import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

import { DiagnosticCenterHeaderComponent } from './diagnostic-center-header/diagnostic-center-header.component';
import { DiagnosticCenterHomeComponent } from './diagnostic-center-home/diagnostic-center-home.component';



@NgModule({
  declarations: [DiagnosticCenterHeaderComponent, DiagnosticCenterHomeComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    DiagnosticCenterHeaderComponent,
    DiagnosticCenterHomeComponent
  ]
})
export class DiagnosisCenterPortalModule { }
