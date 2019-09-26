import { Component, OnInit, Inject } from '@angular/core';
import { AppointmentHttpService } from 'src/app/services/appointment-http.service';
import { IAppointments, AppointmentDayCalendar, AppointmentTimeSlot } from 'src/app/models/appointment';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { Patient } from 'src/app/models/patient';
import { MatDialog } from '@angular/material';
import { PrescriptionFormComponent } from 'src/app/prescription/prescription-form/prescription-form.component';
import { PatientService } from 'src/app/services/patient.service';
import { PrescriptionHttpService } from 'src/app/services/prescription-http.service';

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
  appointmentsExist: boolean;

  constructor(
    private dialog: MatDialog,
    private appointmentService: AppointmentHttpService,
    private onboardingService: OnboardingService,
    private patientService: PatientService,
    private prescriptionService: PrescriptionHttpService
  ) { }

  ngOnInit() {
    this.doctorId = this.onboardingService.userid;
    this.appointments = [];
    this.appointmentSlots = [];
    this.attendees = [];
    this.patients = [];
    this.getAllAppointments();
  }

  getAllAppointments() {
    this.appointmentService.getAllAppointmentsOfUser(this.onboardingService.userid).subscribe( (data) => {
      console.log(data);
      this.appointments = data;
      this.getAttendeesArray();
    });
  }

  getAttendeesArray() {
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

  openPrescriptionDialog(id: string) {
    this.prescriptionService.patientId = id;
    this.prescriptionService.doctorId = this.doctorId;
    const dialogRef = this.dialog.open(PrescriptionFormComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onNoClick(): void {
    const dialogRef = this.dialog.closeAll();
  }

}
