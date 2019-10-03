import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private route: Router, public service: OnboardingService) { }

  ngOnInit() {
  }
  logout() {
    this.service.Logout();
  }

  gotohome() {
    this.route.navigate(['patient/home']);
  }
}
