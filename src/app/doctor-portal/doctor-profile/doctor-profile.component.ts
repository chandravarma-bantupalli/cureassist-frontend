import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../../models/doctor';
import { TimeSlot } from '../../models/time-slot';
import { DoctorHttpService } from '../../services/doctor-http.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DoctorUpdateProfileComponent } from '../doctor-update-profile/doctor-update-profile.component';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  @Input() detailType: string;
  doctor: Doctor;
  timeslots: TimeSlot[];
  userid: string;
  docName: string;
  rating: Float32Array;

  constructor(
    private router: Router,
    private doctorService: DoctorHttpService,
    private onboardingService: OnboardingService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    console.log(this.detailType);
    this.userid = this.onboardingService.userid;
    this.getDoctorProfile(this.userid);
    this.doctorService.getRating().subscribe(data => {this.rating = data; });
  }

  getDoctorProfile(id: string) {
    this.doctor = new Doctor();
    this.doctorService.getDoctorById(id).subscribe((data) => {
      this.doctor = data;
      this.docName = this.doctor.doctorFirstName + ' ' + this.doctor.doctorLastName;
    });
  }

  // goToUpdateProfile() {
  //   // this.onboardingService.userid = this.userid;
  //   this.router.navigate(['/doctor/update']);
  // }

  goToManageSlots() {
    // this.onboardingService.userid = this.userid;
    this.router.navigate(['/doctor/manage/timeslots']);
  }

  goToUpdateProfile(): void {
    const dialogRef = this.dialog.open(DoctorUpdateProfileComponent, {
      width: '50vw',
      height: '80vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
