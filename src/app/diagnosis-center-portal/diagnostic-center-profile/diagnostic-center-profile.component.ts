import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiagnosticCenterHttpService } from '../../services/diagnostic-center-http.service';
import { DiagnosticCenter } from '../../models/diagnostic-center';
import { TimeSlot } from '../../models/time-slot';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-diagnostic-center-profile',
  templateUrl: './diagnostic-center-profile.component.html',
  styleUrls: ['./diagnostic-center-profile.component.css']
})
export class DiagnosticCenterProfileComponent implements OnInit {

  diagnosticCenter: DiagnosticCenter;
  diagnosticCenterSlots: TimeSlot[];
  testsConducted: string[];
  dcId: string;

  constructor(
    private router: Router,
    private dcService: DiagnosticCenterHttpService,
    private onboardingService: OnboardingService
  ) { }

  ngOnInit() {
    this.dcId = this.onboardingService.userid;
    this.getDiagnosticCenterProfile();
  }

  getDiagnosticCenterProfile() {
    this.diagnosticCenter = new DiagnosticCenter();
    this.dcService.getDiagnosticCenterById(this.dcId).subscribe((data) => {
      this.diagnosticCenter = data;
      this.testsConducted = data.testsConducted.split(',');
      console.log(this.diagnosticCenter);
    });
  }

  goToUpdateProfile() {
    this.router.navigate(['/diagnosisCenter/update']);
  }

  goToManageSlots() {
    this.router.navigate(['/diagnosisCenter/manage/timeslots']);
  }
}
