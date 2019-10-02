import { Component, OnInit } from '@angular/core';
import { AppointmentHttpService } from 'src/app/services/appointment-http.service';
import { IAppointments, AppointmentDayCalendar, AppointmentTimeSlot } from 'src/app/models/appointment';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { Patient } from 'src/app/models/patient';
import { PatientService } from '../../services/patient.service';
@Component({
  selector: 'app-diagnostic-center-view-appointments',
  templateUrl: './diagnostic-center-view-appointments.component.html',
  styleUrls: ['./diagnostic-center-view-appointments.component.css']
})
export class DiagnosticCenterViewAppointmentsComponent implements OnInit {

  userAppointments: IAppointments[];
  diagnosticCenterId: string;
  appointments: AppointmentDayCalendar[];
  appointmentSlots: AppointmentTimeSlot[];
  attendees: [];
  patients: Patient[] = [];


  constructor(
    private appointmentService: AppointmentHttpService,
    private onboardingService: OnboardingService,
    private patientService: PatientService
  ) { }

  ngOnInit() {
    this.diagnosticCenterId = this.onboardingService.userid;
    this.getAllAppointments();
  }
  getAllAppointments() {
    this.appointmentService.getAllAppointmentsOfUser(this.diagnosticCenterId).subscribe( (data) => {
      console.log(data);
      this.appointments = data;
      console.log(this.appointments);
      this.getAttendeesArray();
    });
  }

  getAttendeesArray() {
    this.attendees = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.appointments.length; i++) {
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < this.appointments[i].slots.length; j++) {
        // tslint:disable-next-line: prefer-for-of
        for (let k = 0; k < this.appointments[i].slots[j].attendees.length; k++) {
          this.attendees.push(this.appointments[i].slots[j].attendees[k]);
          this.patientService.getPatientByUserId(this.appointments[i].slots[j].attendees[k]).subscribe( (data) => {
            console.log(data);
            this.patients.push(data);
          });
        }
      }
    }
  }
}
