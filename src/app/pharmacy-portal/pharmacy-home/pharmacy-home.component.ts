import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { MatDialog } from '@angular/material';
import { ResetpasswordComponent } from 'src/app/onboarding/resetpassword/resetpassword.component';

@Component({
  selector: 'app-pharmacy-home',
  templateUrl: './pharmacy-home.component.html',
  styleUrls: ['./pharmacy-home.component.css']
})
export class PharmacyHomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private route: Router, private router: ActivatedRoute, public service: OnboardingService) { }

  ngOnInit() {
  }
  editprofile() {
    this.route.navigate(['pharmacy/createprofile']);
  }
  viewprofile() {
    this.route.navigate(['pharmacy/view']);
  }
  resetpassword() {
    this.dialog.open(ResetpasswordComponent, {
      width: '30vw',
      height: '70vh'
    });
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
