import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../../models/time-slot';
import { TimeSlotService } from '../../services/time-slot.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { Router } from '@angular/router';
import { AppointmentHttpService } from 'src/app/services/appointment-http.service';
import { AppointmentDayCalendar } from '../../models/appointment';
import { AppointmentSlot } from '../../models/appointment';


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
  appointmentDayCalendar: AppointmentDayCalendar;
  todaySlots: AppointmentSlot[];

  constructor(
    private timeSlotService: TimeSlotService,
    private onboardingService: OnboardingService,
    private router: Router,
    private appointmentService: AppointmentHttpService,
  ) { }

  ngOnInit() {
    this.userid = this.onboardingService.userid;
    this.getAllDiagCenTimeSlots(this.userid);
    this.appointments = [];
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

  getDayCalendarOfDiagnosticCenter() {
    const date = new Date();
    this.appointmentService.getDayCalendarOfUser('diagnosticCenterId', date.toLocaleDateString()).subscribe( (data) => {
      this.appointmentDayCalendar = data;
      this.todaySlots = this.appointmentDayCalendar.slots;
      console.log(this.todaySlots);
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
