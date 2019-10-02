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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Detailedappointments } from 'src/app/models/detailedappointments';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { element } from 'protractor';

export interface IDoctors {
  ts: any[];
  userid: string;
  doctorId: string;
  doctorFirstName: string;
  doctorLastName: string;
  doctorEmail: string;
  doctorPhoneNumber: string;
  doctorCity: string;
  doctorRegNum: string;
  doctorAddress: string;
  pincode: string;
  doctorSpecialization: string;
  doctorExperience: string;
  doctorSlots: ITimeSlot[];
}
export interface ITimeSlot {
  slotId: string;
  doctorId?: string;
  diagnosticCenterId?: string;
  slotStartTime: string;
  slotEndTime: string;
  testConductedInSlot?: string;
  slotCapacity: number;
}

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
  later: AppointmentDayCalendar[] = [];
  previous: AppointmentDayCalendar[];
  todayPatients: Doctor[] = [];
  tomorrowPatients: Doctor[] = [];
  laterPatients: Doctor[] = [];
  previousPatients: Doctor[] = [];

  detailedAppointments: Detailedappointments[] = [];
  upcomingdetailedAppointment: Detailedappointments = {};
  // todaySlots: any;
 //  upcomingSlots: any;
  // doctor: Doctor[];
 //  patientId: string;
  // datetoday = new Date();

  patientDisplayedColumns: string[] = ['doctorFirstName', 'doctorPhoneNumber'];
  dialog: any;
  bookdate: any;

  constructor(public appointmentService: AppointmentHttpService,
              public service: PatientService, public onboardingService: OnboardingService) {
               }
  ngOnInit() {
    // console.log(this.datetoday.toLocaleDateString());
    // this.patientId = this.onboardingService.userid;
    this.appointments = [];
    // this.appointmentSlots = [];
    this.attendees = [];
    // this.doctor = [];
    // this.patients = [];
    this.getData();
    // this.service.viewAllAppointment().subscribe(data => this.appointments = data);
    // console.log(this.appointments);
    // tslint:disable-next-line:no-shadowed-constiable
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:no-shadowed-constiable
    // this.service.viewAllAppointment().subscribe(data => data.forEach(element => {
    //   // tslint:disable-next-line:no-shadowed-constiable
    //   element.slots.forEach(element => this.attendees.push(element.attendees));
    // }));
    // this.getAllAppointments();

  }
  viewallapointments() {
  }
  // click() {
  //   this.doctorId = [];
  //   this.doctorFirstName = [];
  //   // this.service.GetDoctorById(this.doctorId).subscribe(data => this.doctordetails = data);
  //   // tslint:disable-next-line:no-shadowed-constiable
  //   this.attendees.forEach(element => {
  //     // tslint:disable-next-line: no-shadowed-constiable
  //     element.forEach(element => this.doctorId.push(element));
  //   });
  //   // tslint:disable-next-line:no-shadowed-constiable
  //   this.doctorId.forEach(element => {
  //     this.service.GetDoctorById(element)
  //       // tslint:disable-next-line:max-line-length
  //       .subscribe((data: Doctor) =>
  //       // tslint:disable-next-line: max-line-length
  //       this.appointments.map( e =>  e.doctorDetail = ('Doctor Name:  '
  //  + data.doctorFirstName + ' ' + data.doctorLastName + '  Doctor Address:   ' + data.doctorAddress)));
  //   });
  // }
  // click2() {
  //   // this.service.GetDoctorById(this.doctorId).subscribe(data => this.doctordetails = data);
  //   // tslint:disable-next-line:no-shadowed-constiable
  //   this.doctorId = [];
  //   this.diagnosticName = [];
  //   // tslint:disable-next-line:no-shadowed-constiable
  //   this.attendees.forEach(element => {
  //     // tslint:disable-next-line: no-shadowed-constiable
  //     element.forEach(element => this.doctorId.push(element));
  //   });
  //   // tslint:disable-next-line:no-shadowed-constiable
  //   this.doctorId.forEach(element => {
  //     this.service.GetDiagnosticsById((element))
  //       .subscribe((data: IDiagnostics) => {
  //         // tslint:disable-next-line: max-line-length
  //         this.appointments.map( e =>  e.diagnosticDetail = 'Diagnostic Name='
  //  + data.diagnosticCenterName + ' Diagnostic Center Address=' + data.diagnosticCenterAddress);
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

  // getdoctorData(doctorId):  {
  //   return this.service.GetDoctorById(doctorId);
  // }

  calculateMoment(date) {
    const today = moment().endOf('day').format('YYYY-MM-DD');
    const tomorrow = moment().add(1, 'day').endOf('day');
    // tslint:disable-next-line:max-line-length
    if (date.format('YYYY-MM-DD') === today) { console.log(true); return 'today'; } else if (date.format('YYYY-MM-DD') > today) { console.log(true); return 'later'; }
    return 'previous';
  }

  async getAllAppointments() {
    const promise = new Promise((resolve,reject) => 
    this.appointmentService.getAllAppointmentsOfUser(this.onboardingService.userid).subscribe((data) => {
      this.appointments = data.map(appointment => ({
        ...appointment,
        moment: this.calculateMoment(moment(appointment.date))
      }));
      this.today = this.appointments.filter(a => a.moment === 'today');
      this.later = this.appointments.filter(a => a.moment === 'later');
      this.previous = this.appointments.filter(a => a.moment === 'previous');
      console.log(this.today, 'Todays appointments');
      console.log(this.later, 'upcoming appointments');
      console.log(this.previous, 'previous appointments');
      this.later.forEach(element => console.log(element));
      const todayAttendeesIds = this.getAttendees(this.today);
      console.log(todayAttendeesIds, 'Today');
      const laterAttendeesIds = this.getAttendees(this.later);
      console.log(laterAttendeesIds, 'upcoming');
      const previousAttendeesIds = this.getAttendees(this.previous);
      console.log(previousAttendeesIds, 'previous');
      // tslint:disable-next-line:max-line-length
      todayAttendeesIds.map(data => {console.log(data.attendeeId, 'attendeeId'); this.service.GetDoctorById(data.attendeeId).subscribe(data => this.todayPatients.push(data) ); });
      console.log(this.todayPatients, 'TodayPatients');
      // tslint:disable-next-line:max-line-length
      laterAttendeesIds.forEach(data => {console.log(data.attendeeId, 'attendeeId'); this.service.GetDoctorById(data.attendeeId).subscribe(data => this.tomorrowPatients.push(data)); });
      console.log(this.tomorrowPatients, 'tomorrowpatients');
      // tslint:disable-next-line:max-line-length
      previousAttendeesIds.map(data => {console.log(data.attendeeId, 'attendeeId'); this.service.GetDoctorById(data.attendeeId).subscribe(data => this.previousPatients.push(data) ); });
      console.log(this.previousPatients, 'PreviousPatients');
      for (const iterator of this.later) {
        console.log(iterator.slots[0].timeSlot.startTime, 'forof later');
        this.upcomingdetailedAppointment.date = iterator.slots[0].timeSlot.date;
        this.upcomingdetailedAppointment.startTime = iterator.slots[0].timeSlot.startTime;
        this.upcomingdetailedAppointment.endTime = iterator.slots[0].timeSlot.endTime;
        // this.upcomingdetailedAppointment.doctorFirstName = this.tomorrowPatients[this.later.indexOf(iterator)].doctorFirstName;
        // this.upcomingdetailedAppointment.doctorLastName = this.tomorrowPatients[this.later.indexOf(iterator)].doctorLastName;
        // this.upcomingdetailedAppointment.doctorPhoneNumber = this.tomorrowPatients[this.later.indexOf(iterator)].doctorPhoneNumber;
        this.detailedAppointments.push(this.upcomingdetailedAppointment);
        console.log(this.later.indexOf(iterator), 'index of');
      }
      console.log(this.detailedAppointments, 'detail');
    }));
    await promise;
    console.log(this.tomorrowPatients, 'after promise');
    console.log(this.later, 'after prom');
    this.tomorrowPatients.forEach((element, i) => {
        this.upcomingdetailedAppointment.doctorFirstName = element.doctorFirstName;
        this.upcomingdetailedAppointment.doctorLastName = element.doctorLastName;
        this.upcomingdetailedAppointment.doctorPhoneNumber = element.doctorPhoneNumber;
        this.upcomingdetailedAppointment.date = this.later[i].date;
        this.upcomingdetailedAppointment.startTime = this.later[i].slots[0].timeSlot.StartTime;
        this.upcomingdetailedAppointment.endTime = this.later[i].slots[0].timeSlot.EndTime;
        console.log(this.upcomingdetailedAppointment, 'abc');
    });

  }
    getData() {
      this.getAllAppointments();
    }

  }










// for (let i = 0; i < this.later.length ; i++) {
//   console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
//   this.upcomingdetailedAppintment.doctorFirstName = this.tomorrowPatients[i].doctorFirstName;
//   this.upcomingdetailedAppintment.doctorLastName = this.tomorrowPatients[i].doctorLastName;
//   this.upcomingdetailedAppintment.doctorPhoneNumber = this.tomorrowPatients[i].doctorPhoneNumber;
//   this.upcomingdetailedAppintment.date = this.later[i].date;
//   this.upcomingdetailedAppintment.startTime = this.later[i].slots[0].timeSlot.StartTime;
//   this.upcomingdetailedAppintment.endTime = this.later[i].slots[0].timeSlot.EndTime;
//   console.log(this.upcomingdetailedAppintment, i);
// }