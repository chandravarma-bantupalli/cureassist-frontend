import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescriptions, PrescribedMedicines } from '../models/prescriptions';
import { TestReports } from '../models/testreports';
import { environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HealthrecordsService {
  orderMedicines = [];
  prescription: Prescriptions;
  currentPrescription: Prescriptions;
  PrescriptionId: string; PrescriptionDate: Date; PatientId: string; PatientName: string; PatientPhoneNumber: string; DoctorName: string;
  DoctorPhoneNumber: string; Symptoms: Array<string> = []; Remarks: string;
  urlForTestReports = environment.testreportAPI + '/api/testreports';
  PrescribedMedicines: PrescribedMedicines; CurrentLocation: string; pincode: string;

  constructor(private http: HttpClient) { }
  getPatientPrescriptions(patientid: string): Observable<Prescriptions[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Prescriptions[]>(environment.prescriptionAPI + '/api/prescription/prescription/' + patientid);
  }
  sendprescriptiontopharmacy(body) {
    this.currentPrescription = body;
    console.log(this.currentPrescription.prescription.prescriptionId);
    this.PrescriptionId = this.currentPrescription.prescription.prescriptionId;
    this.PrescriptionDate = this.currentPrescription.prescription.prescriptionDate;
    this.PatientId = this.currentPrescription.prescription.patientId;
    this.PatientName = this.currentPrescription.prescription.patientName;
    this.PatientPhoneNumber = this.currentPrescription.prescription.patientPhoneNumber;
    this.DoctorName = this.currentPrescription.prescription.doctorName;
    this.DoctorPhoneNumber = this.currentPrescription.prescription.doctorphoneNumber;
    this.Symptoms = this.currentPrescription.prescription.symptoms;
    this.Remarks = this.currentPrescription.prescription.remarks;
    this.PrescribedMedicines = this.currentPrescription.prescription.selectedMeds;
    console.log(this.PrescribedMedicines);
    this.CurrentLocation = this.currentPrescription.prescription.location;
    this.pincode = this.currentPrescription.prescription.pincode;
    // tslint:disable-next-line:max-line-length
    return this.http.post(environment.pharmacyAPI + '/api/prescriptions', {PrescriptionId: this.PrescriptionId, PrescriptionDate: this.PrescriptionDate, PatientId: this.PatientId, PatientName: this.PatientName, PatientPhoneNumber: this.PatientPhoneNumber, DoctorName: this.DoctorName, DoctorPhoneNumber: this.DoctorPhoneNumber, Symptoms: this.Symptoms, Remarks: this.Remarks, PrescribedMedicines: this.PrescribedMedicines, CurrentLocation: this.CurrentLocation, pincode: this.pincode});
  }
  somethingClick(medicine: string) {
    if (this.orderMedicines.includes(medicine)) {
      this.orderMedicines.splice(this.orderMedicines.indexOf(medicine), 1);
    } else {
      this.orderMedicines.push(medicine);
    }
    console.log(this.orderMedicines);
  }
    selectedPrescription(prescribed) {
      this.prescription = prescribed;
      console.log(this.prescription);
    }
    getPatientTestReport(patientid: string): Observable<TestReports[]> {
      // tslint:disable-next-line:max-line-length
      return this.http.get<TestReports[]>(environment.testreportAPI + '/api/testreports/patient/' + patientid);
    }

    getAllTestReports() {
      return this.http.get<TestReports[]>(this.urlForTestReports);
    }
    getLinkToReport(patientId: string, fileName: string) {
      return this.http.get(this.urlForTestReports + `/${patientId}/report/${fileName}/link`, {responseType: 'text'});
    }
    getReportofpatient(patientId: string) {
      return this.http.get<TestReports[]>(this.urlForTestReports + `/${patientId}`);
    }
  }
