import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnboardingService } from '../../services/onboarding.service';
import { MatDialog } from '@angular/material';
import { ResetpasswordComponent } from 'src/app/onboarding/resetpassword/resetpassword.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  patientid: any;
  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute, public service: OnboardingService) {
    this.route.params.subscribe(params => this.patientid = params.patientid);
  }

  ngOnInit() {
  }

  viewProfile() {
    this.router.navigate(['patient/view-edit']);
  }
  homebutton() {
    this.router.navigate(['patient/search']);
  }
  // resetpassword() {
  //   this.router.navigate(['onboarding/resetpassword']);
  // }
  resetpassword() {
    this.dialog.open(ResetpasswordComponent, {
      width: '30vw',
      height: '70vh'
    });
  }
  viewprescription() {
    this.router.navigate(['medicalrecords/viewprescription/' + this.service.userid]);
  }
  editProfile() {
    this.router.navigate(['patient/profile/post']);
  }
  viewtestreport() {
    this.router.navigate(['medicalrecords/viewtestreport/' + this.service.userid]);
  }

  logout() {
    return this.service.Logout();
  }

}
