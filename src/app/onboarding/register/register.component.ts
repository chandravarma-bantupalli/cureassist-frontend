import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../../services/onboarding.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: OnboardingService) { }
  emailId: any = '';
  // password: any = '';
  // confirmpassword: any = '';
  usertype: string;
  errorStatus: any;
  ngOnInit() {
    this.usertype = window.location.href;
    this.usertype = this.usertype.split('.')[0];
    this.usertype = this.usertype.split('//')[1];
    if (this.usertype === 'cureassist') {
      this.usertype = 'patient';
    } else if (this.usertype === 'doctor') {
      this.usertype = 'doctor';
    } else if (this.usertype === 'dc') {
      this.usertype = 'dc';
    } else if (this.usertype === 'pharmacy') {
      this.usertype = 'pharmacy';
    }
  }
  CreateUser() {
    this.service.CreateUser(this.emailId, this.usertype)
      .subscribe(data => this.errorStatus = data, error => { this.errorStatus = error.status; });
  }
}
