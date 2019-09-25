import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../../services/onboarding.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: OnboardingService, private bottomSheet: MatBottomSheet) { }
  emailId: any = '';
  // password: any = '';
  // confirmpassword: any = '';
  usertype: string;
  errorStatus: any;
  ngOnInit() {
    this.usertype = window.location.href;
    this.usertype = this.usertype.split('//')[1];
    this.usertype = this.usertype.split('.')[0];
    // if (this.usertype === 'patient') {
    //   this.usertype = 'patient';
    // } else if (this.usertype === 'doctor') {
    //   this.usertype = 'doctor';
    // } else if (this.usertype === 'dc') {
    //   this.usertype = 'dc';
    // } else if (this.usertype === 'pharmacy') {
    //   this.usertype = 'pharmacy';
    // }
  }
  CreateUser() {
    this.service.CreateUser(this.emailId, this.usertype)
      .subscribe(data => this.errorStatus = data, error => { if (error.status == 409 || error.status == 500) {
        this.errorStatus = error.status;
      } else {
        console.log('a');
        this.bottomSheet.open(BottomSheet);
      }  });
  }
}
@Component({
  selector: 'app-bottomsheet',
  templateUrl: 'bottomsheet.html',
})
export class BottomSheet {
  constructor(private bottomSheet: MatBottomSheetRef<BottomSheet>) { }

  openLink(): void {
    this.bottomSheet.dismiss();
    event.preventDefault();
  }
}
