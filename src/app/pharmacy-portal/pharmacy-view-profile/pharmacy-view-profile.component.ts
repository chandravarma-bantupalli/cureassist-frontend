import { Component, OnInit } from '@angular/core';
import { Pharmacy } from 'src/app/models/pharmacy';
import { ActivatedRoute, Router } from '@angular/router';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-pharmacy-view-profile',
  templateUrl: './pharmacy-view-profile.component.html',
  styleUrls: ['./pharmacy-view-profile.component.css']
})
export class PharmacyViewProfileComponent implements OnInit {
  pharmacy: Pharmacy;
  sub: any;
  Email: any;

  constructor(private route: ActivatedRoute, public service: PharmacyService, private router: Router) {
    this.route.params.subscribe(params => this.Email = params.emailid);
  }

  ngOnInit() {
    this.service.getPharmacy()
      .subscribe(data => {
        // console.log(data);
        this.service.formModel.setValue(data);
        // console.log(this.service.formModel);
        // console.log(this.pharmacy);
      });
  }
  onsubmit(): void {
    this.service.updateprofile(this.Email).subscribe();
  }

}
