import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from '../../services/onboarding.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailId: any = '';
  password: any = '';
  errorStatus: any = '';
  usertype: string;
  ngOnInit() {
    this.usertype = window.location.href;
    this.usertype = this.usertype.split('.')[0];
    this.usertype = this.usertype.split('//')[1];
    if (this.usertype === 'cureassist') {
      this.usertype = 'patient';
    }
  }
  constructor(private service: OnboardingService, private route: Router) { }
  LoginUser() {
    // tslint:disable-next-line:max-line-length
    this.service.LoginUser(this.emailId, this.password, this.usertype).subscribe((data: any) => {
      this.service.isAuthenticate(data.userAccessToken);
    }, (error) => {
      this.errorStatus = error.status;
    });
  }

}
