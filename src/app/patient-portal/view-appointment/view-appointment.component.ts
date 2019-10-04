import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { PatientService } from 'src/app/services/patient.service';
import * as moment from 'moment';
import { AppointmentHttpService } from 'src/app/services/appointment-http.service';
import { AppointmentDayCalendar } from 'src/app/models/appointment';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StarRatingComponent } from 'ng-starrating';
import { DiagnosticCenterHttpService } from 'src/app/services/diagnostic-center-http.service';

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
  dialog: any;
  bookdate: any;
  ratingvalue: number;

  constructor(public appointmentService: AppointmentHttpService,
              public service: PatientService, public onboardingService: OnboardingService,
              public diagnosis: DiagnosticCenterHttpService) {
               }
  ngOnInit() {
    this.appointments = [];
    this.attendees = [];
    this.getData();

  }
  viewallapointments() {
  }
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
    const promise = new Promise((resolve, reject) =>
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

////////////////////////////////// Today Appointment Doctor///////////////////////////////////////////////////

      this.today.forEach( appointment => {
      this.service.GetDoctorById(appointment.slots[0].attendees[0].attendeeId)
      .subscribe(data => {
        if (data !== null) {
        appointment.doctorFirstName = 'Dr. ' + data.doctorFirstName;
        appointment.doctorLastName = data.doctorLastName;
        appointment.doctorPhoneNumber = data.doctorPhoneNumber;
        appointment.startTime = appointment.slots[0].timeSlot.startTime;
        appointment.endTime = appointment.slots[0].timeSlot.endTime;
        }
          }); });
      console.log(this.today, 'todayDoctors');
////////////////////////////// Today Appointments Diagnosis///////////////////
      this.today.forEach(appointment => {
        this.diagnosis.getDiagnosticCenterById(appointment.slots[0].attendees[0].attendeeId)
          .subscribe(data => {
            if (data !== null) {
              appointment.doctorFirstName = data.diagnosticCenterName;
              appointment.doctorPhoneNumber = data.diagnosticCenterPhone;
              appointment.startTime = appointment.slots[0].timeSlot.startTime;
              appointment.endTime = appointment.slots[0].timeSlot.endTime;
            }
          });
      });
      console.log(this.today, 'todayDiagnosis');


///////////////////////////// Upcoming Appointments Doctor///////////////////////////////////////////////////
      this.later.forEach( appointment => {
          this.service.GetDoctorById(appointment.slots[0].attendees[0].attendeeId)
          .subscribe(data => {
            if (data !== null) {
            appointment.doctorFirstName = 'Dr. ' + data.doctorFirstName;
            appointment.doctorLastName = data.doctorLastName;
            appointment.doctorPhoneNumber = data.doctorPhoneNumber;
            appointment.startTime = appointment.slots[0].timeSlot.startTime;
            appointment.endTime = appointment.slots[0].timeSlot.endTime;
            }
          }); });
      console.log(this.later, 'laterDoctors');


//////////////////////////// Upcoming Appointments DC///////////////////////////
      this.later.forEach(appointment => {
        this.diagnosis.getDiagnosticCenterById(appointment.slots[0].attendees[0].attendeeId)
          .subscribe(data => {
            if (data !== null) {
              appointment.doctorFirstName = data.diagnosticCenterName;
              appointment.doctorPhoneNumber = data.diagnosticCenterPhone;
              appointment.startTime = appointment.slots[0].timeSlot.startTime;
              appointment.endTime = appointment.slots[0].timeSlot.endTime;
            }
          });
      });
      console.log(this.later, 'laterDiagnosis');

/////////////////////////// Previous Appointments///////////////////////////////////////
      this.previous.forEach(appointment => {
        this.service.GetDoctorById(appointment.slots[0].attendees[0].attendeeId)

          .subscribe(data => {
            if (data !== null) {
            appointment.doctorFirstName =  'Dr. ' + data.doctorFirstName;
            appointment.doctorLastName = data.doctorLastName;
            appointment.doctorPhoneNumber = data.doctorPhoneNumber;
            appointment.startTime = appointment.slots[0].timeSlot.startTime;
            appointment.endTime = appointment.slots[0].timeSlot.endTime;
            appointment.userId = appointment.slots[0].attendees[0].attendeeId;
            }
          });
      });
      console.log(this.previous, 'previousDoctors');
///////////////////////////////// Previous Appointments Diagnosis///////////////////////
      this.previous.forEach(appointment => {
        this.diagnosis.getDiagnosticCenterById(appointment.slots[0].attendees[0].attendeeId)

          .subscribe(data => {
            if (data !== null) {
              appointment.doctorFirstName = data.diagnosticCenterName;
              appointment.doctorPhoneNumber = data.diagnosticCenterPhone;
              appointment.startTime = appointment.slots[0].timeSlot.startTime;
              appointment.endTime = appointment.slots[0].timeSlot.endTime;
              appointment.userId = appointment.slots[0].attendees[0].attendeeId;
            }
          });
      });
      console.log(this.previous, 'previousDoctors');
////////////////////////////////////////////////////////////////////////////////////////
    }));
    await promise;
  }
    getData() {
      this.getAllAppointments();
    }
    onRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}, doctorId: string) {
      this.ratingvalue = $event.newValue;
      console.log(this.ratingvalue);
      console.log(doctorId);
      this.service.SendRating( this.onboardingService.userid, doctorId, this.ratingvalue).subscribe();
      }
  }
  