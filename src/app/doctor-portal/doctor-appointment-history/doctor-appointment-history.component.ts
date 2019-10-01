import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Patient } from 'src/app/models/patient';
import { AppointmentHttpService } from 'src/app/services/appointment-http.service';
import { IAppointments, AppointmentDayCalendar, AppointmentTimeSlot } from 'src/app/models/appointment';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { PatientService } from 'src/app/services/patient.service';


import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-appointment-history',
  templateUrl: './doctor-appointment-history.component.html',
  styleUrls: ['./doctor-appointment-history.component.css']
})
export class DoctorAppointmentHistoryComponent implements OnInit {
  @Input() when: string;
  userAppointments: IAppointments[];
  doctorId: string;
  appointments: AppointmentDayCalendar[];
  appointmentSlots: AppointmentTimeSlot[];
  attendees: string[];
  patients: Patient[];
  today: AppointmentDayCalendar[];
  tomorrow: AppointmentDayCalendar[];
  later: AppointmentDayCalendar[];

  todayPatients: Patient[];
  tomorrowPatients: Patient[];
  laterPatients: Patient[];

  todaySlots: any;
  upcomingSlots: any;

  patientDisplayedColumns: string[];
  appointmentsExist: boolean;

  constructor( private appointmentService: AppointmentHttpService,
               private onboardingService: OnboardingService,
               private patientService: PatientService,  private router: Router) { }

  ngOnInit() {
    this.doctorId = this.onboardingService.userid;
    this.appointments = [];
    this.appointmentSlots = [];
    this.attendees = [];
    this.patients = [];
    this.getAllAppointments();
  }

  getAttendees(days) {
    return days.reduce((acc, { slots }) => {
      slots.forEach(slot => {
        acc.push(...slot.attendees);
      });
      return acc;
    }, []);
  }

  calculateMoment(date) {
    const today = moment().endOf('day');
    const tomorrow = moment().add(1, 'day').endOf('day');
    if (date < today) { return 'today'; }

    return 'later';
  }

  getPatientData(patientId): Promise<Patient> {
    return this.patientService.getPatientByUserId(patientId).toPromise();
  }

  getAllAppointments() {
    this.appointmentService.getAllAppointmentsOfUser(this.onboardingService.userid).subscribe((data) => {
      this.appointments = data.map(appointment => ({
        ...appointment,
        moment: this.calculateMoment(moment(appointment.date))
      }));
      this.today = this.appointments.filter(a => a.moment === 'today');
      this.later = this.appointments.filter(a => a.moment === 'later');
      const todayAttendeesIds = this.getAttendees(this.today);
      const laterAttendeesIds = this.getAttendees(this.later);
      const todaysPatientsPromise = Promise.all<Patient>(todayAttendeesIds.map(this.getPatientData.bind(this)));
      const laterPatientPromise = Promise.all<Patient>(laterAttendeesIds.map(this.getPatientData.bind(this)));
      laterPatientPromise.then((patients) => {
        this.tomorrowPatients = patients;
      });
      // todaysPatientsPromise.then((patients) => {
      //   this.todayPatients.push(...patients);
      // });
    });
  }
  gotoprofile() {
      this.router.navigate(['/doctor/home']);
    }
  }


