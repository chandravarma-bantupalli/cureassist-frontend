import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnboardingService } from '../../services/onboarding.service';

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.css']
})
export class SetpasswordComponent implements OnInit {
  emailId = '';
  password: any = '';
  confirmpassword: any = '';
  errorStatus: any = '';
  usertype: string;
  UserId: any;
  ngOnInit() {
    this.usertype = window.location.href;
    this.usertype = this.usertype.split('.')[0];
    this.usertype = this.usertype.split('//')[1];
  }
  constructor(
    private service: OnboardingService,
    private route: ActivatedRoute,
    private routes: Router
  ) {
    this.route.params.subscribe(params => (this.UserId = params.UserId));
  }
  SetPassword() {
    // tslint:disable-next-line:max-line-length
    if (this.password === this.confirmpassword) {
      this.service.SetPassword(this.password, this.UserId).subscribe(
        data => (this.errorStatus = data),
        error => {
          this.errorStatus = error.status;
        }
      );
      if (this.errorStatus === 403) {
        this.errorStatus = 403;
      } else {
        if ((window.location.href).includes('patient')) {
          this.routes.navigate(['patient/profile/post']);
        } else if ((window.location.href).includes('doctor')) {
          this.routes.navigate(['doctor/home']);
        } else if ((window.location.href).includes('dc')) {
          this.routes.navigate(['diagnosisCenter/home']);
        } else if ((window.location.href).includes('pharmacy')) {
          this.routes.navigate(['pharmacy/createprofile']);
        }
      }
    }
  }
}
