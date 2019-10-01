import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-pharmacy-home',
  templateUrl: './pharmacy-home.component.html',
  styleUrls: ['./pharmacy-home.component.css']
})
export class PharmacyHomeComponent implements OnInit {

  constructor(private route: Router, private router: ActivatedRoute, public service: OnboardingService) { }

  ngOnInit() {
  }
  editprofile() {
    this.route.navigate(['pharmacy/createprofile']);
  }
  viewprofile() {
    this.route.navigate(['pharmacy/view']);
  }
  resetPassword() {
    this.route.navigate(['onboarding/resetpassword']);
  }
  logout() {
    this.service.Logout();
  }
  getMyOrders() {
    this.route.navigate(['pharmacy/myorders']);
  }
  gotohome() {
    this.route.navigate(['pharmacy/home']);
  }
}
