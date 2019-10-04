import { Component, OnInit } from '@angular/core';
import { AppointmentHttpService } from 'src/app/services/appointment-http.service';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';
import { AppointmentDayCalendar } from '../../models/appointment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TestReports } from 'src/app/models/testreports';
import { TestReportsService } from 'src/app/services/test-reports.service';
import { DiagnosticCenterHttpService } from 'src/app/services/diagnostic-center-http.service';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-view-appointment-details',
  templateUrl: './view-appointment-details.component.html',
  styleUrls: ['./view-appointment-details.component.css']
})
export class ViewAppointmentDetailsComponent implements OnInit {

  appointmentPatientId: string;
  dcId: string;
  patient: Patient;
  appointment: AppointmentDayCalendar;
  attendeeName: string;
  attendeePhone: string;
  dcName: string;
  dcPhone: string;
  testReportForm: FormGroup;

  testReport: TestReports;
  formData: FormData;
  fileToUpload: File = null;

  constructor(
    private appointmentService: AppointmentHttpService,
    private patientService: PatientService,
    private formBuilder: FormBuilder,
    private reportsService: TestReportsService,
    private dcService: DiagnosticCenterHttpService,
    public dialogRef: MatDialogRef<ViewAppointmentDetailsComponent>,
  ) { }

  ngOnInit() {
    this.appointmentPatientId = this.appointmentService.dcAppointmentPatientId;
    this.dcId = this.appointmentService.dcId;
    this.getPatientDetails(this.appointmentPatientId);
    this.getAppointmentDetails();
    this.initiateTestReportForm();
    this.getDCProfile();
  }

  getPatientDetails(userId: string) {
    this.patientService.getPatientByUserId(userId).subscribe( (data) => {
      console.log(data);
      this.patient = data;
      this.attendeeName = this.patient.firstName + ' ' + this.patient.lastName;
      this.attendeePhone = this.patient.phoneNumber.toString();
    });
  }

  getAppointmentDetails() {
    this.appointmentService.getAllAppointmentsOfUser(this.dcId).subscribe( (data) => {
      console.log(data);
    });
  }

  initiateTestReportForm() {
    this.testReportForm = this.formBuilder.group(
      {
        testReportId: '',
        nameOfTestConducted: '',
        patientId: this.appointmentPatientId,
        patientName: this.attendeeName,
        patientPhoneNumber: this.attendeePhone,
        diagnosticCenterId: this.dcId,
        diagnosticCenterName: this.dcName,
        diagnosticCenterPhone: this.dcPhone,
        fileName: '',
        fileLocation: ''
      }
    );
  }

  getDCProfile() {
    this.dcService.getDiagnosticCenterById(this.dcId).subscribe( (data) => {
      this.dcName = data.diagnosticCenterName;
      this.dcPhone = data.diagnosticCenterPhone;
    });
  }

  putFileInBucket() {
    const patientId = this.testReportForm.value.patientId;
    const fd = this.formData;
    const testName = this.testReportForm.value.nameOfTestConducted;
    const tr: TestReports = this.testReportForm.value;
    this.reportsService.uploadTestReport(patientId, fd, testName, tr).subscribe( (data) => {
      console.log(data);
      this.onNoClick();
    }, (err) => {
      this.onNoClick();
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.formData = new FormData();
    this.formData.append('file', this.fileToUpload, this.fileToUpload.name);
  }

  onNoClick(): void {
    this.dialogRef.close();
    alert(`Added test report of ${this.testReportForm.value.nameOfTestConducted} successfully to patient ${this.attendeeName}`);
  }

}
