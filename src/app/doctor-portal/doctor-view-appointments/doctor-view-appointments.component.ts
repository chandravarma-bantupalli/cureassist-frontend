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

  todayPatients: Patient[];
  tomorrowPatients: Patient[];
  laterPatients: Patient[];

  todaySlots: any;
  upcomingSlots: any;

  patientDisplayedColumns: string[];
  appointmentsExist: boolean;

  constructor(
    private dialog: MatDialog,
    private appointmentService: AppointmentHttpService,
    private onboardingService: OnboardingService,
    private patientService: PatientService,
    private prescriptionService: PrescriptionHttpService
  ) {
    this.todayPatients = [];
    this.tomorrowPatients = [];
    this.laterPatients = [];
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
    if (date < today) { return 'today' }

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
      let todayAttendeesIds = this.getAttendees(this.today);
      let laterAttendeesIds = this.getAttendees(this.later);
      let todaysPatientsPromise = Promise.all<Patient>(todayAttendeesIds.map(this.getPatientData.bind(this)));
      let laterPatientPromise = Promise.all<Patient>(laterAttendeesIds.map(this.getPatientData.bind(this)));
      laterPatientPromise.then((patients) => {
        this.tomorrowPatients = patients;
      });
      todaysPatientsPromise.then((patients) => {
        this.todayPatients.push(...patients);
      });
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

  onNoClick(): void {
    const dialogRef = this.dialog.closeAll();
  }
}
