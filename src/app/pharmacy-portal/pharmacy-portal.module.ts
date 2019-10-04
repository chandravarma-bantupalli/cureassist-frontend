import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyHomeComponent } from './pharmacy-home/pharmacy-home.component';
import { PharmacyOrdersPageComponent } from './pharmacy-orders-page/pharmacy-orders-page.component';
import { PharmacyProfileComponent } from './pharmacy-profile/pharmacy-profile.component';
import { PharmacyViewProfileComponent } from './pharmacy-view-profile/pharmacy-view-profile.component';
// tslint:disable-next-line:max-line-length
import { MatToolbarModule, MatButtonModule, MatFormFieldModule, MatCardModule, MatMenuModule, MatCheckboxModule, MatInputModule, MatExpansionModule, MatListModule, MatTableModule, MatSidenavModule, MatChipsModule, MatDialogRef, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { PharmacyConfirmOrdersComponent } from './pharmacy-confirm-orders/pharmacy-confirm-orders.component';
import { PharmacyEditProfileDialogComponent } from './pharmacy-edit-profile-dialog/pharmacy-edit-profile-dialog.component';
import { AvatarModule } from 'ngx-avatar';
import { CdkTableModule } from '@angular/cdk/table';



@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [PharmacyHomeComponent, PharmacyOrdersPageComponent, PharmacyProfileComponent, PharmacyViewProfileComponent, PharmacyConfirmOrdersComponent, PharmacyEditProfileDialogComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatInputModule,
    MatExpansionModule,
    BrowserModule,
    MatListModule,
    MatTableModule,
    MatSidenavModule,
    MatExpansionModule,
    MatChipsModule,
    AvatarModule,
    MatIconModule
  ],
  providers: [
    {provide: MatDialogRef, useValue: {} }
  ],
  entryComponents: [
    PharmacyEditProfileDialogComponent
  ]

})
export class PharmacyPortalModule { }
