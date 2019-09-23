import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../../models/time-slot';
import { TimeSlotService } from '../../services/time-slot.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnostic-center-home',
  templateUrl: './diagnostic-center-home.component.html',
  styleUrls: ['./diagnostic-center-home.component.css']
})
export class DiagnosticCenterHomeComponent implements OnInit {

  appointments: any[];
  timeSlots: TimeSlot[];
  userid: string;
  dcProfileExists: boolean;

  constructor(
    private timeSlotService: TimeSlotService,
    private onboardingService: OnboardingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userid = this.onboardingService.userid;
    this.getAllDiagCenTimeSlots(this.userid);
    this.appointments = [
    ];
  }

  getAllDiagCenTimeSlots(id: string) {
    this.timeSlotService.getDiagnosticCenterTimeSlots(id).subscribe((data) => {
      console.log(data);
      this.timeSlots = data;
      this.dcProfileExists = true;
    }, (err) => {
      this.dcProfileExists = false;
    });
  }

  goToSetProfile() {
    this.onboardingService.userid = this.userid;
    this.router.navigate(['/diagnosisCenter/update']);
  }

}
