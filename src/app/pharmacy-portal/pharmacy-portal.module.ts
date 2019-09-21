import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyCurrentOrderComponent } from './pharmacy-current-order/pharmacy-current-order.component';
import { PharmacyHomeComponent } from './pharmacy-home/pharmacy-home.component';
import { PharmacyOrdersPageComponent } from './pharmacy-orders-page/pharmacy-orders-page.component';
import { PharmacyProfileComponent } from './pharmacy-profile/pharmacy-profile.component';
import { PharmacyViewProfileComponent } from './pharmacy-view-profile/pharmacy-view-profile.component';
// tslint:disable-next-line:max-line-length
import { MatToolbarModule, MatButtonModule, MatFormFieldModule, MatCardModule, MatMenuModule, MatCheckboxModule, MatInputModule, MatExpansionModule, MatListModule, MatTableModule, MatSidenavModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [PharmacyCurrentOrderComponent, PharmacyHomeComponent, PharmacyOrdersPageComponent, PharmacyProfileComponent, PharmacyViewProfileComponent],
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
  ]
})
export class PharmacyPortalModule { }
