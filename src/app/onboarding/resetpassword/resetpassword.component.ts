import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../../services/onboarding.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  oldpassword: string;
  newpassword: string;
  confirmnewpassword: any;
  constructor(private service: OnboardingService) { }

  ngOnInit() {
  }
  ResetPassword() {
    // tslint:disable-next-line:max-line-length
    if (this.newpassword === this.confirmnewpassword) {
      this.service.ResetPassword(this.oldpassword, this.newpassword).subscribe();
    }
  }

}
