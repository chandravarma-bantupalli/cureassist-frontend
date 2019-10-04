import { Component, OnInit, Input } from '@angular/core';
import { AppointmentHttpService } from 'src/app/services/appointment-http.service';
import { IAppointments, AppointmentDayCalendar, AppointmentTimeSlot } from 'src/app/models/appointment';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { Patient } from 'src/app/models/patient';
import { PatientService } from '../../services/patient.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { ViewAppointmentDetailsComponent } from '../view-appointment-details/view-appointment-details.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-diagnostic-center-view-appointments',
  templateUrl: './diagnostic-center-view-appointments.component.html',
  styleUrls: ['./diagnostic-center-view-appointments.component.css']
})
export class DiagnosticCenterViewAppointmentsComponent implements OnInit {

  @Input() when: string;
  userAppointments: IAppointments[];
  diagnosticCenterId: string;
  appointments: AppointmentDayCalendar[];
  appointmentSlots: AppointmentTimeSlot[];
  attendees: [];
  patients: Patient[];
  today: AppointmentDayCalendar[];
  tomorrow: AppointmentDayCalendar[];
  later: AppointmentDayCalendar[];
  previous: AppointmentDayCalendar[];

  todayPatients: Patient[] = [];
  tomorrowPatients: Patient[] = [];
  laterPatients: Patient[] = [];
  previousPatients: Patient[] = [];
  isHomePage: boolean;


  constructor(
    private appointmentService: AppointmentHttpService,
    private onboardingService: OnboardingService,
    private patientService: PatientService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.diagnosticCenterId = '45987123-ed2456';
    // this.diagnosticCenterId = this.onboardingService.userid;
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
    console.log(this.diagnosticCenterId);
    this.appointmentService.getAllAppointmentsOfUser(this.diagnosticCenterId).subscribe((data) => {
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
      // console.log(this.previous);
      const previousAttendeesIds = this.getAttendees(this.previous);
      console.log(previousAttendeesIds, 'previous');
      // this.getAttendeeDetails(previousAttendeesIds);
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

  }

  viewAllAppointments() {
    this.router.navigate(['/diagnosisCenter/appointments/history']);
  }

  onNoClick(): void {
  }

  viewAppointmentDetails(userId: string) {
    console.log(userId);
    this.appointmentService.dcAppointmentPatientId = userId;
    this.appointmentService.dcId = this.diagnosticCenterId;
    const dialogRef = this.dialog.open(ViewAppointmentDetailsComponent, {
      width: '50vw',
      height: '50vh'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

}
