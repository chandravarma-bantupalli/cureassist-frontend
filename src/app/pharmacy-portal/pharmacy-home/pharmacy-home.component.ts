import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-pharmacy-home',
  templateUrl: './pharmacy-home.component.html',
  styleUrls: ['./pharmacy-home.component.css']
})
export class PharmacyHomeComponent implements OnInit {

  constructor(private route: Router, private service: OnboardingService) { }

  ngOnInit() {
  }
  editprofile() {
    this.route.navigate(['/pharmacy/createprofile']);
  }
  viewprofile() {
    this.route.navigate(['/pharmacy/viewprofile']);
  }
  resetPassword() {
    this.route.navigate(['onboarding/resetpassword']);
  }
  logout() {
    this.service.Logout();
  }
}
