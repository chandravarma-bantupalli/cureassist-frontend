import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Prescription, PrescribedMedicines } from '../../models/prescription';
import { DoctorViewAppointmentsComponent } from 'src/app/doctor-portal/doctor-view-appointments/doctor-view-appointments.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PrescriptionHttpService } from 'src/app/services/prescription-http.service';
import { PatientService } from 'src/app/services/patient.service';
import { DoctorHttpService } from 'src/app/services/doctor-http.service';

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
  patientUserId: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  patientPhoneNumber: string;
  doctorName: string;
  doctorPhoneNumber: string;


  constructor(
    public dialogRef: MatDialogRef<DoctorViewAppointmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private prescriptionService: PrescriptionHttpService,
    private patientService: PatientService,
    private doctorService: DoctorHttpService
  ) { }

  ngOnInit() {
    this.patientUserId = this.prescriptionService.patientId;
    this.doctorId = this.prescriptionService.doctorId;
    this.instantiatePrescriptionForm();
    this.initiateMedicineForm();
    this.getDoctorNameAndPhone();
    this.getPatientNameAndPhone();
  }


  instantiatePrescriptionForm() {
    this.prescriptionForm = this.formBuilder.group({
      prescriptionId: '',
      prescritionDate: '',
      patientId: '',
      patientName: this.patientName,
      patientPhoneNumber: this.patientPhoneNumber,
      doctorName: this.doctorName,
      doctorphoneNumber: this.doctorPhoneNumber,
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

  getDoctorNameAndPhone() {
    this.doctorService.getDoctorById(this.doctorId).subscribe( (d) => {
      console.log(d);
      this.doctorName = 'Dr. ' + d.doctorFirstName + ' ' + d.doctorLastName;
      this.doctorPhoneNumber = d.doctorPhoneNumber;
    });
  }

  getPatientNameAndPhone() {
    this.patientService.getPatientByUserId(this.patientUserId).subscribe( (p) => {
      console.log(p);
      this.patientId = p.patientId;
      this.patientName = p.firstName + ' ' + p.lastName;
      this.patientPhoneNumber = p.phoneNumber.toString();
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
    this.newPrescription.patientId = this.patientUserId;
    this.newPrescription.patientName = this.patientName;
    this.newPrescription.patientPhoneNumber = this.patientPhoneNumber;
    this.newPrescription.doctorName = this.doctorName;
    this.newPrescription.doctorphoneNumber = this.doctorPhoneNumber;
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
