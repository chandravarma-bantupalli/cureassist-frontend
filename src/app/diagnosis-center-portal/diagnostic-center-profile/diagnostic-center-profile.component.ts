import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DiagnosticCenterHttpService } from '../../services/diagnostic-center-http.service';
import { DiagnosticCenter } from '../../models/diagnostic-center';
import { TimeSlot } from '../../models/time-slot';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { MatDialog } from '@angular/material';
import { DiagnosticCenterUpdateProfileComponent } from '../diagnostic-center-update-profile/diagnostic-center-update-profile.component';

@Component({
  selector: 'app-diagnostic-center-profile',
  templateUrl: './diagnostic-center-profile.component.html',
  styleUrls: ['./diagnostic-center-profile.component.css']
})
export class DiagnosticCenterProfileComponent implements OnInit {

  @Input() detailType: string;
  diagnosticCenter: DiagnosticCenter;
  diagnosticCenterSlots: TimeSlot[];
  testsConducted: string[];
  dcId: string;
  rating: Float32Array;

  constructor(
    private router: Router,
    private dcService: DiagnosticCenterHttpService,
    private onboardingService: OnboardingService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dcId = '45987123-ed2456';
    // this.dcId = this.onboardingService.userid;
    this.getDiagnosticCenterProfile();
    this.dcService.getRating().subscribe( (data) => this.rating = data);
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
    const dialogRef = this.dialog.open(DiagnosticCenterUpdateProfileComponent, {
      width: '50vw',
      height: '80vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  goToManageSlots() {
    this.router.navigate(['/diagnosisCenter/manage/timeslots']);
  }
}
