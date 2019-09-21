import { Component, OnInit } from '@angular/core';
import { IAppointments } from 'src/app/models/appointment';
import { Doctor } from 'src/app/models/doctor';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {

  appointments: IAppointments[];
  doctorDetails: Doctor[];
  userId: 'karan';
  date: string;
  doctorFirstName: Array<string> = [];
  diagnosticName: Array<string> = [];
  attendees: Array<any> = [];
  doctorId: Array<any> = [];
  slot: any;
  diagnosticCity: string;
  constructor(public service: PatientService) { }
  ngOnInit() {
    this.service.viewAllAppointment().subscribe( data => this.appointments = data);
  // tslint:disable-next-line:no-shadowed-variable
  // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:no-shadowed-variable
    this.service.viewAllAppointment().subscribe(data => data.forEach(element => {
     // tslint:disable-next-line:no-shadowed-variable
    element.slots.forEach(element => this.attendees.push(element.attendees)); }));
 }
 click() {
  this.doctorId = [];
  this.doctorFirstName = [];
  // this.service.GetDoctorById(this.doctorId).subscribe(data => this.doctordetails = data);
  // tslint:disable-next-line:no-shadowed-variable
  this.attendees.forEach(element => { element.forEach(element => this.doctorId.push(element));
 });
 // tslint:disable-next-line:no-shadowed-variable
  this.doctorId.forEach(element => {
  this.service.GetDoctorById(element)
  .subscribe(data => this.doctorFirstName.push(data.doctorFirstName + ' ' + data.doctorLastName + ' ' + data.doctorAddress));
  } );
  }
 click2() {
  // this.service.GetDoctorById(this.doctorId).subscribe(data => this.doctordetails = data);
  // tslint:disable-next-line:no-shadowed-variable
  this.doctorId = [];
  this.diagnosticName = [];
  // tslint:disable-next-line:no-shadowed-variable
  this.attendees.forEach(element => { element.forEach(element => this.doctorId.push(element));
 });
 // tslint:disable-next-line:no-shadowed-variable
  this.doctorId.forEach(element => {
  this.service.GetDiagnosticsById(element)
  .subscribe(data => this.diagnosticName.push(data.diagnosticCenterName + ' ' + data.diagnosticCenterAddress),
   ); } );
  }

}
