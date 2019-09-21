import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-pharmacy-profile',
  templateUrl: './pharmacy-profile.component.html',
  styleUrls: ['./pharmacy-profile.component.css']
})
export class PharmacyProfileComponent implements OnInit {
  constructor(private route: Router, public service: PharmacyService) { }
  ngOnInit() {
    // this.service.formModel.reset();
   }
  onsubmit(): void {
  this.service.CreateProfile().subscribe();
  }

}
