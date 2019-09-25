import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescriptionFormComponent } from './prescription-form/prescription-form.component';
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PrescriptionFormComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
  ],
  exports: [
    PrescriptionFormComponent
  ],
  entryComponents: [
    PrescriptionFormComponent
  ]
})
export class PrescriptionModule { }
