import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiagnosticCenterHttpService } from '../../services/diagnostic-center-http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DiagnosticCenter } from '../../models/diagnostic-center';
import { TimeSlot } from '../../models/time-slot';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-diagnostic-center-update-profile',
  templateUrl: './diagnostic-center-update-profile.component.html',
  styleUrls: ['./diagnostic-center-update-profile.component.css']
})
export class DiagnosticCenterUpdateProfileComponent implements OnInit {

  dcProfile: FormGroup;
  diagCen: DiagnosticCenter;
  timeSlots: TimeSlot[];
  userId: string;
  dcProfileExists: boolean;

  constructor(
    private router: Router,
    private dcService: DiagnosticCenterHttpService,
    private formBuilder: FormBuilder,
    private onboardingService: OnboardingService
  ) { }

  ngOnInit() {
    this.userId = '45987123-ed2456';
    // this.userId = this.onboardingService.userid;
    this.initializeDcProfileForm();
    this.getDiagnosticCenterProfile();
  }

  initializeDcProfileForm() {
    this.dcProfile = this.formBuilder.group({
      ts: '',
      diagnosticCenterId: '',
      userid: this.userId,
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
    this.dcService.getDiagnosticCenterById(this.userId).subscribe((data) => {
      this.dcProfile.setValue(data);
      this.diagCen = data;
      this.timeSlots = data.diagnosticCenterSlots;
      this.dcProfileExists = true;
    }, (err) => {
      console.log(err);
      this.dcProfileExists = false;
    });
  }

  goToManageSlots() {
    this.router.navigate(['/diagnosisCenter/manage/timeslots']);
  }

  saveProfile() {
    if (this.dcProfileExists) {
      const dc: DiagnosticCenter = this.dcProfile.value;
      console.log(dc);
      // setting the above values to previous because, these are updated only during the CRUD operations on Time Slots.
      this.dcService.updateDiagnosticCenter(this.userId, dc).subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
      this.router.navigate(['/diagnosisCenter/profile']);
    } else {
      const dc: DiagnosticCenter = this.dcProfile.value;
      dc.userid = this.userId;
      dc.diagnosticCenterSlots = [];

      this.dcService.addNewDiagnsoticCenter(dc).subscribe( (res) => {
        console.log(res);
      });

      this.router.navigate(['/diagnosisCenter/manage/timeslots']);
    }
  }

}
