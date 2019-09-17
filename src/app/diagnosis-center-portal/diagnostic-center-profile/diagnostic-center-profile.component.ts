import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnostic-center-profile',
  templateUrl: './diagnostic-center-profile.component.html',
  styleUrls: ['./diagnostic-center-profile.component.css']
})
export class DiagnosticCenterProfileComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToUpdateProfile() {
    this.router.navigate(['/diagnosisCenter/update']);
  }

  goToManageSlots() {
    this.router.navigate(['/diagnosisCenter/manage/timeslots']);
  }
}
