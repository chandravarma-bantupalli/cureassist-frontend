import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Prescription, PrescribedMedicines } from '../../models/prescription';
import { DoctorViewAppointmentsComponent } from 'src/app/doctor-portal/doctor-view-appointments/doctor-view-appointments.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { PrescriptionHttpService } from 'src/app/services/prescription-http.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { PatientService } from 'src/app/services/patient.service';
import { DoctorHttpService } from 'src/app/services/doctor-http.service';
import { ISymptoms } from 'src/app/models/prescriptions';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.css']
})
export class PrescriptionFormComponent implements OnInit {

  today = Date.now();
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
  imageUrl: string;
  fileToUpload: File = null;

  // starting of symtoms suggestions
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  symptomsCtrl = new FormControl();
  filteredSymptoms: Observable<string[]>;
  symptoms: string[] = [];
  allSymptoms: Array<string> = [];
  allMedicine: string[] = [];
  filteredMedicine: Observable<string[]>;
  // myMedicine = new FormControl();
  // filteredMedicine: Observable<string[]>;

  @ViewChild('symptomInput', { static: false }) symptomInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  prescriptionForm = this.formBuilder.group({
    prescriptionId: '',
    prescritionDate: '',
    patientId: '',
    patientName: this.patientName,
    patientPhoneNumber: this.patientPhoneNumber,
    doctorName: this.doctorName,
    doctorphoneNumber: this.doctorPhoneNumber,
    symptoms: '',
    remarks: '',
    // allPrescribedMedicines: [{medicineForm: this.formBuilder.group({
    //   medicineName: '',
    //   medicineQuantity: '',
    //   prescribedDosage: '',
    //   prescribedTimings: [],
    //   prescribedDays: '',
    // })}]
     allPrescribedMedicines: []
  });
  constructor(
    public dialogRef: MatDialogRef<DoctorViewAppointmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private prescriptionService: PrescriptionHttpService,
    private patientService: PatientService,
    private doctorService: DoctorHttpService
  ) {
    this.filteredSymptoms = this.symptomsCtrl.valueChanges.pipe(
      startWith(null),
      map((symptom: string | null) => symptom ? this._filter(symptom) : this.allSymptoms.slice()));
  }

  ngOnInit() {
    this.patientUserId = this.prescriptionService.patientId;
    this.doctorId = this.prescriptionService.doctorId;
    this.initiateMedicineForm();
    this.getDoctorNameAndPhone();
    this.getPatientNameAndPhone();
    this.prescriptionService.getSymptomsSuggestions().subscribe(data => data[0].symptoms.forEach(symptom => {
      this.allSymptoms.push(symptom);
    }));
    // this.prescriptionService.getMedicineSuggestions().subscribe(data => data[0].medicines.forEach(medicine => {
    //   this.allMedicine.push(medicine);
    // }));
    // this.filteredMedicine = this.prescriptionForm.controls.medicineName.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filterMedicine(value))
    //   );
  }

  initiateMedicineForm() {
    this.medicineForm = this.formBuilder.group({
      medicineName: '',
      medicineQuantity: '',
      prescribedDosage: '',
      prescribedTimings: [],
      prescribedDays: '',
    });
  }

  getDoctorNameAndPhone() {
    this.doctorService.getDoctorById(this.doctorId).subscribe((d) => {
      console.log(d);
      this.doctorName = 'Dr. ' + d.doctorFirstName + ' ' + d.doctorLastName;
      this.doctorPhoneNumber = d.doctorPhoneNumber;
    });
  }

  getPatientNameAndPhone() {
    this.patientService.getPatientByUserId(this.patientUserId).subscribe((p) => {
      console.log(p);
      this.patientId = p.patientId;
      this.patientName = p.firstName + ' ' + p.lastName;
      this.patientPhoneNumber = p.phoneNumber.toString();
    });
  }

  AddMedicines() {
   // this.ListOfMedicine =
  console.log(this.medicineForm.value);
  this.ListOfMedicine.push(this.medicineForm.value);
  this.prescriptionForm.controls.allPrescribedMedicines.setValue(this.ListOfMedicine);
  console.log(this.prescriptionForm.value);
  this.medicineForm.reset();
  }


  submitPrescription() {
    const symptoms = this.prescriptionForm.value.symptoms;
    const date = new Date();
    this.SymptomsByDoctor = this.symptoms;
    this.newPrescription = this.prescriptionForm.value;
    this.newPrescription.patientId = this.patientUserId;
    this.newPrescription.patientName = this.patientName;
    this.newPrescription.patientPhoneNumber = this.patientPhoneNumber;
    this.newPrescription.doctorName = this.doctorName;
    this.newPrescription.doctorphoneNumber = this.doctorPhoneNumber;
    this.newPrescription.prescriptionDate = date.toLocaleDateString();
    this.newPrescription.symptoms = this.SymptomsByDoctor;
    this.newPrescription.allPrescribedMedicines = this.ListOfMedicine;
    this.prescriptionService.addNewPrescription(this.newPrescription).subscribe((data) => {
      console.log(this.newPrescription);
      console.log(data);
      this.prescriptionForm.reset();
    });
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  // symptoms method start
  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.symptoms.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.symptomsCtrl.setValue(null);
    }
  }

  remove(symptom: string): void {
    const index = this.symptoms.indexOf(symptom);

    if (index >= 0) {
      this.symptoms.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.symptoms.push(event.option.viewValue);
    this.symptomInput.nativeElement.value = '';
    this.symptomsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSymptoms.filter(symptom => symptom.toLowerCase().indexOf(filterValue) === 0);
  }
  // private _filterMedicine(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   console.log(this.myMedicine.value);

  //   return this.allMedicine.filter(option => option.toLowerCase().includes(filterValue));
  // }



  // Method to handle image
  handleImage(File: File) {
    this.fileToUpload = File;
    const reader = new FileReader();
    // reader.onload = (event: any) => {
    //   this.imageUrl = event.target.result;
    // }
    reader.readAsDataURL(this.fileToUpload);
  }
}
