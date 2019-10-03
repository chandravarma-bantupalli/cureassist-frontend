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
  MatSelectModule,
  MatChipsModule,
  MatIconModule,
  MatAutocompleteModule,

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
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
   
  ],
  exports: [
    PrescriptionFormComponent
  ],
  entryComponents: [
    PrescriptionFormComponent
  ]
})
export class PrescriptionModule { }
