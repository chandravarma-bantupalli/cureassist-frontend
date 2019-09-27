import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { PatientService } from 'src/app/services/patient.service';
import { DiagnosticCenter } from 'src/app/models/diagnostic-center';
import { IDiagnostics } from 'src/app/models/diagnostics';
import * as moment from 'moment';
import { AppointmentHttpService } from 'src/app/services/appointment-http.service';
import { IAppointments, AppointmentDayCalendar, AppointmentTimeSlot } from 'src/app/models/appointment';
import { Patient } from 'src/app/models/patient';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {
  @Input() when: string;
  panelOpenState = false;
  appointments: AppointmentDayCalendar[];
  doctorDetails: Doctor[];
  date: string;
  doctorFirstName: Array<string> = [];
  diagnosticName: Array<string> = [];
  attendees: Array<any> = [];
  doctorId: Array<any> = [];
  slot: any;
  diagnosticCity: string;

  today: AppointmentDayCalendar[];
  tomorrow: AppointmentDayCalendar[];
  later: AppointmentDayCalendar[];

  todayPatients: Patient[];
  tomorrowPatients: Patient[];
  laterPatients: Patient[];

  todaySlots: any;
  upcomingSlots: any;

  patientDisplayedColumns: string[];

  constructor(public appointmentService: AppointmentHttpService, public service: PatientService, public onboardingService: OnboardingService) { }
  ngOnInit() {
    // this.doctorId = this.onboardingService.userid;
    this.appointments = [];
    // this.appointmentSlots = [];
    this.attendees = [];
    this.todayPatients = [];
    this.patientDisplayedColumns = ['firstName', 'phoneNumber', 'prescription'];
    // this.patients = [];
    this.getAllAppointments();
    // this.service.viewAllAppointment().subscribe(data => this.appointments = data);
    console.log(this.appointments);
    // tslint:disable-next-line:no-shadowed-variable
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:no-shadowed-variable
    // this.service.viewAllAppointment().subscribe(data => data.forEach(element => {
    //   // tslint:disable-next-line:no-shadowed-variable
    //   element.slots.forEach(element => this.attendees.push(element.attendees));
    // }));
    this.getAllAppointments();

  }
  viewallapointments() {
  
  }
  // click() {
  //   this.doctorId = [];
  //   this.doctorFirstName = [];
  //   // this.service.GetDoctorById(this.doctorId).subscribe(data => this.doctordetails = data);
  //   // tslint:disable-next-line:no-shadowed-variable
  //   this.attendees.forEach(element => {
  //     // tslint:disable-next-line: no-shadowed-variable
  //     element.forEach(element => this.doctorId.push(element));
  //   });
  //   // tslint:disable-next-line:no-shadowed-variable
  //   this.doctorId.forEach(element => {
  //     this.service.GetDoctorById(element)
  //       // tslint:disable-next-line:max-line-length
  //       .subscribe((data: Doctor) =>
  //       // tslint:disable-next-line: max-line-length
  //       this.appointments.map( e =>  e.doctorDetail = ('Doctor Name:  ' + data.doctorFirstName + ' ' + data.doctorLastName + '  Doctor Address:   ' + data.doctorAddress)));
  //   });
  // }
  // click2() {
  //   // this.service.GetDoctorById(this.doctorId).subscribe(data => this.doctordetails = data);
  //   // tslint:disable-next-line:no-shadowed-variable
  //   this.doctorId = [];
  //   this.diagnosticName = [];
  //   // tslint:disable-next-line:no-shadowed-variable
  //   this.attendees.forEach(element => {
  //     // tslint:disable-next-line: no-shadowed-variable
  //     element.forEach(element => this.doctorId.push(element));
  //   });
  //   // tslint:disable-next-line:no-shadowed-variable
  //   this.doctorId.forEach(element => {
  //     this.service.GetDiagnosticsById((element))
  //       .subscribe((data: IDiagnostics) => {
  //         // tslint:disable-next-line: max-line-length
  //         this.appointments.map( e =>  e.diagnosticDetail = 'Diagnostic Name=' + data.diagnosticCenterName + ' Diagnostic Center Address=' + data.diagnosticCenterAddress);
  //       });
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

  getPatientData(patientId): Promise<Patient> {
    return this.service.getPatientByUserId(patientId).toPromise();
  }

  calculateMoment(date) {
    const today = moment().endOf('day')
    const tomorrow = moment().add(1, 'day').endOf('day')
    if (date < today) return 'today'

    return 'later'
  }

  getAllAppointments() {
    this.appointmentService.getAllAppointmentsOfUser(this.onboardingService.userid).subscribe((data) => {
      this.appointments = data.map(appointment => ({
        ...appointment,
        moment: this.calculateMoment(moment(appointment.date)),
      }));

      this.today = this.appointments.filter(a => a.moment === 'today');
      this.later = this.appointments.filter(a => a.moment === 'later');

      var todayAttendeesIds = this.getAttendees(this.today);
      var laterAttendeesIds = this.getAttendees(this.later);
      var todaysPatientsPromise = Promise.all<Patient>(todayAttendeesIds.map(this.getPatientData.bind(this)));
      var laterPatientPromise = Promise.all<Patient>(laterAttendeesIds.map(this.getPatientData.bind(this)));

      laterPatientPromise.then((patients) => {
        this.tomorrowPatients = patients;
        console.log(this.tomorrowPatients);
      });
      todaysPatientsPromise.then((patients) => {
        if (patients !== undefined) {
          this.todayPatients = patients;
        }
        console.log(this.todayPatients);
      });
    });
  }

}
