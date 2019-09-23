import { Component, OnInit } from '@angular/core';
import { TestReports } from 'src/app/models/testreports';
import { HealthrecordsService } from 'src/app/services/healthrecords.service';
import { ActivatedRoute } from '@angular/router';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-view-testreports',
  templateUrl: './view-testreports.component.html',
  styleUrls: ['./view-testreports.component.css']
})
export class ViewTestreportsComponent implements OnInit {

  testreports: TestReports[];
  patientid: string;
 constructor(private service: HealthrecordsService, private route: ActivatedRoute, private onboardservice: OnboardingService
  ) {
   this.route.params.subscribe(params => this.patientid = params.patientid);
  }

 ngOnInit() {
   this.service.getPatientTestReport(this.onboardservice.userid).subscribe(data => this.testreports = data);
 }

}
