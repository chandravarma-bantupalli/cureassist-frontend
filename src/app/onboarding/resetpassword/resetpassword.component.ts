import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../../services/onboarding.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  oldpassword: string;
  newpassword: string;
  confirmnewpassword: any;
  errorStatus: number;
  constructor(private service: OnboardingService, private route: Router) { }

  ngOnInit() {
  }
  resetPassword() {
    // tslint:disable-next-line:max-line-length
    if (this.newpassword === this.confirmnewpassword) {
      this.route.navigate(['onboarding/login']);
      this.service.ResetPassword(this.oldpassword, this.newpassword).subscribe();
    }
  }

}
