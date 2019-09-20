import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-homepage',
  templateUrl: './onboarding-homepage.component.html',
  styleUrls: ['./onboarding-homepage.component.css']
})
export class OnboardingHomepageComponent implements OnInit {

  constructor(private route: Router) { }
  login() {
    this.route.navigate(['onboarding/login']);
  }
  register() {
    this.route.navigate(['onboarding/register']);
  }

  ngOnInit() {
  }

}
