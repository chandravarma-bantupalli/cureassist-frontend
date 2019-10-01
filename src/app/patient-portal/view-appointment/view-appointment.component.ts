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
  previous: AppointmentDayCalendar[];

  todayPatients: Doctor[] = [];
  tomorrowPatients: Doctor[] = [];
  laterPatients: Doctor[] = [];
  previousPatients: Doctor[] = [];

  // todaySlots: any;
 //  upcomingSlots: any;
  // doctor: Doctor[];
 //  patientId: string;
  // datetoday = new Date();

  patientDisplayedColumns: string[];

  constructor(public appointmentService: AppointmentHttpService,
              public service: PatientService, public onboardingService: OnboardingService) {
                this.patientDisplayedColumns = ['doctorFirstName', 'doctorPhoneNumber', 'doctorLastName'];
               }
  ngOnInit() {
    // console.log(this.datetoday.toLocaleDateString());
    // this.patientId = this.onboardingService.userid;
    this.appointments = [];
    // this.appointmentSlots = [];
    this.attendees = [];
    // this.doctor = [];
    // this.patients = [];
    this.getAllAppointments();
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

  getdoctorData(doctorId): Promise<Doctor> {
    return this.service.GetDoctorById(doctorId).toPromise();
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
    this.appointmentService.getAllAppointmentsOfUser(this.onboardingService.userIdDemo).subscribe((data) => {
      this.appointments = data.map(appointment => ({
        ...appointment,
        moment: this.calculateMoment(moment(appointment.date))
      }));
      this.today = this.appointments.filter(a => a.moment === 'today');
      this.later = this.appointments.filter(a => a.moment === 'later');
      this.previous = this.appointments.filter(a => a.moment === 'previous');
      console.log(this.today, 'you want');
      const todayAttendeesIds = this.getAttendees(this.today);
      console.log(todayAttendeesIds, 'Today');
      const laterAttendeesIds = this.getAttendees(this.later);
      const previousAttendeesIds = this.getAttendees(this.previous);
      console.log(previousAttendeesIds, 'previous');
      // tslint:disable-next-line:max-line-length
      todayAttendeesIds.map(data => {console.log(data.attendeeId, 'attendeeId'); this.service.GetDoctorById(data.attendeeId).subscribe(data => this.todayPatients.push(data) ); });
      console.log(this.todayPatients);
      // tslint:disable-next-line:max-line-length
      laterAttendeesIds.map(data => {console.log(data.attendeeId, 'attendeeId'); this.service.GetDoctorById(data.attendeeId).subscribe(data => this.tomorrowPatients.push(data) ); });
      console.log(this.tomorrowPatients);
      // tslint:disable-next-line:max-line-length
      previousAttendeesIds.map(data => {console.log(data.attendeeId, 'attendeeId'); this.service.GetDoctorById(data.attendeeId).subscribe(data => this.previousPatients.push(data) ); });
      console.log(this.previousPatients);
    });
  }

}
