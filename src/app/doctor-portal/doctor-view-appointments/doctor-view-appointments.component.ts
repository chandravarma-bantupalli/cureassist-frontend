import { Component, OnInit, Inject, Input } from '@angular/core';
import { AppointmentHttpService } from 'src/app/services/appointment-http.service';
import { IAppointments, AppointmentDayCalendar, AppointmentTimeSlot } from 'src/app/models/appointment';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { Patient } from 'src/app/models/patient';
import { MatDialog } from '@angular/material';
import { PrescriptionFormComponent } from 'src/app/prescription/prescription-form/prescription-form.component';
import { PatientService } from 'src/app/services/patient.service';
import { PrescriptionHttpService } from 'src/app/services/prescription-http.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-view-appointments',
  templateUrl: './doctor-view-appointments.component.html',
  styleUrls: ['./doctor-view-appointments.component.css']
})
export class DoctorViewAppointmentsComponent implements OnInit {

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
  previous: AppointmentDayCalendar[];

  todayPatients: Patient[] = [];
  tomorrowPatients: Patient[] = [];
  laterPatients: Patient[] = [];
  previousPatients: Patient[] = [];

  todaySlots: any;
  upcomingSlots: any;

  patientDisplayedColumns: string[];
  appointmentsExist: boolean;
  temp: string;

  constructor(
    private dialog: MatDialog,
    private appointmentService: AppointmentHttpService,
    private onboardingService: OnboardingService,
    private patientService: PatientService,
    private prescriptionService: PrescriptionHttpService,
    private router: Router
  ) {
    this.patientDisplayedColumns = ['firstName', 'phoneNumber', 'prescription'];
  }

  ngOnInit() {
    this.doctorId = this.onboardingService.userid;
    this.appointments = [];
    this.appointmentSlots = [];
    this.attendees = [];
    this.patients = [];
    this.getAllAppointments();
  }

  // getAttendees(days) {
  //   return days.reduce((acc, { slots }) => {
  //     slots.forEach(slot => {
  //       acc.push(...slot.attendees);
  //     });
  //     return acc;
  //   }, []);
  // }

  // calculateMoment(date) {
  //   const today = moment().endOf('day');
  //   const tomorrow = moment().add(1, 'day').endOf('day');
  //   if (date < today) { return 'today'; }

  //   return 'later';
  // }

  // getPatientData(patientId): Promise<Patient> {
  //   return this.patientService.getPatientByUserId(patientId).toPromise();
  // }

  // getAllAppointments() {
  //   this.appointmentService.getAllAppointmentsOfUser(this.onboardingService.userid).subscribe((data) => {
  //     this.appointments = data.map(appointment => ({
  //       ...appointment,
  //       moment: this.calculateMoment(moment(appointment.date))
  //     }));
  //     this.today = this.appointments.filter(a => a.moment === 'today');
  //     this.later = this.appointments.filter(a => a.moment === 'later');
  //     console.log(this.today);
  //     console.log(this.later);
  //     const todayAttendeesIds = this.getAttendees(this.today);
  //     const laterAttendeesIds = this.getAttendees(this.later);
  //     const todaysPatientsPromise = Promise.all<Patient>(todayAttendeesIds.map(this.getPatientData.bind(this)));
  //     const laterPatientPromise = Promise.all<Patient>(laterAttendeesIds.map(this.getPatientData.bind(this)));
  //     laterPatientPromise.then((patients) => {
  //       this.tomorrowPatients = patients;
  //     });
  //     todaysPatientsPromise.then((patients) => {
  //       this.todayPatients.push(...patients);
  //     });
  //   });
  // }

  getAttendees(days) {
    return days.reduce((acc, { slots }) => {
      slots.forEach(slot => {
        acc.push(...slot.attendees);
      });
      return acc;
    }, []);
  }

  getpatientData(patientId): Promise<Patient> {
    return this.patientService.getPatientByUserId(patientId).toPromise();
  }

  calculateMoment(date) {
    const today = moment().endOf('day').format('YYYY-MM-DD');
    const tomorrow = moment().add(1, 'day').endOf('day');
    // tslint:disable-next-line:max-line-length
    if (date.format('YYYY-MM-DD') === today) { console.log(true); return 'today'; } else if (date.format('YYYY-MM-DD') > today) { console.log(true); return 'later'; }
    return 'previous';
  }

  getAllAppointments() {
    console.log(this.onboardingService.userid);
    this.appointmentService.getAllAppointmentsOfUser(this.onboardingService.userid).subscribe((data) => {
      this.appointments = data.map(appointment => ({
        ...appointment,
        moment: this.calculateMoment(moment(appointment.date))
      }));
      this.today = this.appointments.filter(a => a.moment === 'today');
      this.later = this.appointments.filter(a => a.moment === 'later');
      this.previous = this.appointments.filter(a => a.moment === 'previous');
      console.log(this.today);
      const todayAttendeesIds = this.getAttendees(this.today);

      // todayAttendeesIds.map( x => { this.temp = x.attendeeId; });
      // console.log(this.temp);
      console.log(todayAttendeesIds, 'Today');
      const laterAttendeesIds = this.getAttendees(this.later);
      console.log(laterAttendeesIds, 'tomo');
      const previousAttendeesIds = this.getAttendees(this.previous);
      console.log(previousAttendeesIds, 'previous');
      // tslint:disable-next-line:max-line-length
      todayAttendeesIds.map(data => {console.log(data.attendeeId, 'attendeeId'); this.patientService.getPatientByUserId(data.attendeeId).subscribe(data => this.todayPatients.push(data) ); });
      console.log(this.todayPatients, 'today patients');
      // tslint:disable-next-line:max-line-length
      laterAttendeesIds.map(data => {console.log(data.attendeeId, 'attendeeId'); this.patientService.getPatientByUserId(data.attendeeId).subscribe(data => this.tomorrowPatients.push(data) ); });
      console.log(this.tomorrowPatients, 'upcoming patients');
      // tslint:disable-next-line:max-line-length
      previousAttendeesIds.map(data => {console.log(data.attendeeId, 'attendeeId'); this.patientService.getPatientByUserId(data.attendeeId).subscribe(data => this.previousPatients.push(data) ); });
      console.log(this.previousPatients);
    });
  }


  openPrescriptionDialog(id: string) {
    this.prescriptionService.patientId = id;
    this.prescriptionService.doctorId = this.doctorId;
    const dialogRef = this.dialog.open(PrescriptionFormComponent, {
      width: 'auto',
      height: '100vh'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  viewAllAppointments() {
    this.router.navigate(['/doctor/view']);
  }

  onNoClick(): void {
    const dialogRef = this.dialog.closeAll();
  }
}
