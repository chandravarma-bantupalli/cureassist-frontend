import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Prescription, PrescribedMedicines } from '../../models/prescription';
import { DoctorViewAppointmentsComponent } from 'src/app/doctor-portal/doctor-view-appointments/doctor-view-appointments.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PrescriptionHttpService } from 'src/app/services/prescription-http.service';

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.css']
})
export class PrescriptionFormComponent implements OnInit {

  today = Date.now();
  prescriptionForm: FormGroup;
  medicineForm: FormGroup;
  RemarksByDoctor: string;
  SymptomsByDoctor: string[];
  ListOfMedicine: PrescribedMedicines[] = [];
  TimingArray: string[] = ['morning', 'afternoon', 'evening'];
  newPrescription: Prescription;


  constructor(
    public dialogRef: MatDialogRef<DoctorViewAppointmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private prescriptionService: PrescriptionHttpService
  ) { }

  ngOnInit() {
     this.instantiatePrescriptionForm();
     this.initiateMedicineForm();
  }


  instantiatePrescriptionForm() {
    this.prescriptionForm = this.formBuilder.group({
      prescriptionId: '',
      prescritionDate: '',
      patientId: '',
      patientName: '',
      patientPhoneNumber: '',
      doctorName: '',
      doctorphoneNumber: '',
      symptoms: '',
      remarks: '',
      allPrescribedMedicines: ''
    });
  }

  initiateMedicineForm() {
    this.medicineForm = this.formBuilder.group({
      medicineName: '',
      prescribedDosage: '',
      prescribedTimings: [],
      prescribedDays: '',
    });
  }

  addMedicine() {
    const newItem = this.medicineForm.value;
    this.ListOfMedicine.push(newItem);
    this.initiateMedicineForm();
  }


  submitPrescription() {
    const symptoms = this.prescriptionForm.value.symptoms;
    const date = new Date();
    this.SymptomsByDoctor = symptoms.split(' ');
    this.newPrescription = this.prescriptionForm.value;
    this.newPrescription.prescriptionDate = date.toLocaleDateString();
    this.newPrescription.symptoms = this.SymptomsByDoctor;
    this.newPrescription.allPrescribedMedicines = this.ListOfMedicine;
    this.prescriptionService.addNewPrescription(this.newPrescription).subscribe( (data) => {
      console.log(this.newPrescription);
      console.log(data);
      this.prescriptionForm.reset();
    });
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
