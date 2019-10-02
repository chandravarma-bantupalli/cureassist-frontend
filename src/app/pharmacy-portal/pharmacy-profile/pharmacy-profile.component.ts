import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-pharmacy-profile',
  templateUrl: './pharmacy-profile.component.html',
  styleUrls: ['./pharmacy-profile.component.css']
})
export class PharmacyProfileComponent implements OnInit {
  constructor(private route: Router, public service: PharmacyService, public serve: OnboardingService) { }
  ngOnInit() {
    // this.service.formModel.reset();
   }

  onsubmit(): void {
  this.service.CreateProfile().subscribe();
  }

  logout() {
    this.serve.Logout();
  }

  gotohome() {
    this.route.navigate(['pharmacy/home']);
  }

}
