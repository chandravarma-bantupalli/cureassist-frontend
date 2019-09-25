import { Component, OnInit } from '@angular/core';
import { AppointmentHttpService } from 'src/app/services/appointment-http.service';
import { IAppointments, AppointmentDayCalendar, AppointmentTimeSlot } from 'src/app/models/appointment';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-doctor-view-appointments',
  templateUrl: './doctor-view-appointments.component.html',
  styleUrls: ['./doctor-view-appointments.component.css']
})
export class DoctorViewAppointmentsComponent implements OnInit {

  userAppointments: IAppointments[];
  doctorId: string;
  appointments: AppointmentDayCalendar[];
  appointmentSlots: AppointmentTimeSlot[];
  attendees: string[];
  patients: Patient[];

  constructor(
    private appointmentService: AppointmentHttpService,
    private onboardingService: OnboardingService
  ) { }
  ngOnInit() {
    this.doctorId = this.onboardingService.userid;
    this.getAllAppointments();
  }

  getAllAppointments() {
    this.appointmentService.getAllAppointmentsOfUser('user123456').subscribe( (data) => {
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
        }
      }
    }
    console.log(this.attendees);
    this.getPatientDetails();
  }

  getPatientDetails() {
    this.patients = [];
    this.patients.length = this.attendees.length;
    for (const attendee of this.attendees) {
      this.appointmentService.getDetailsOfAttendee(attendee).subscribe( (data) => {
        console.log(data);
        this.patients.push(data);
      });
    }
  }
}
