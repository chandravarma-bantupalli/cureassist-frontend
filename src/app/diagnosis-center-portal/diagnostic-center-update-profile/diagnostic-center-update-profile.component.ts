import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiagnosticCenterHttpService } from 'src/app/services/diagnostic-center-http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DiagnosticCenter } from 'src/app/models/diagnostic-center';
import { TimeSlot } from 'src/app/models/time-slot';

@Component({
  selector: 'app-diagnostic-center-update-profile',
  templateUrl: './diagnostic-center-update-profile.component.html',
  styleUrls: ['./diagnostic-center-update-profile.component.css']
})
export class DiagnosticCenterUpdateProfileComponent implements OnInit {

  dcProfile: FormGroup;
  diagCen: DiagnosticCenter;
  timeSlots: TimeSlot[];

  constructor(
    private router: Router,
    private dcService: DiagnosticCenterHttpService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeDcProfileForm();
    this.getDiagnosticCenterProfile();
  }

  initializeDcProfileForm() {
    this.dcProfile = this.formBuilder.group({
      ts: '',
      diagnosticCenterId: '',
      diagnosticCenterName: '',
      diagnosticCenterEmail: '',
      diagnosticCenterPhone: '',
      diagnosticCenterCity: '',
      diagnosticCenterAddress: '',
      pincode: '',
      diagnosticCenterRegNum: '',
      testsConducted: '',
      diagnosticCenterSlots: ''
    });
  }

  getDiagnosticCenterProfile() {
    this.dcService.getDiagnosticCenterById().subscribe( (data) => {
      this.dcProfile.setValue(data);
      this.diagCen = data;
      this.timeSlots = data.diagnosticCenterSlots;
    });
  }

  goToManageSlots() {
    this.router.navigate(['/diagnosisCenter/manage/timeslots']);
  }

  saveProfile() {
    const dc: DiagnosticCenter = this.dcProfile.value;
    console.log(dc);
    // setting the above values to previous because, these are updated only during the CRUD operations on Time Slots.
    this.dcService.updateDiagnosticCenter(dc).subscribe( (res) => {
      console.log(res);
    });
    this.router.navigate(['/diagnosisCenter/profile']);
  }

}
