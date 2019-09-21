import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OnboardingService } from './onboarding.service';
import { IAppointments } from '../models/appointment';
import { Doctor } from '../models/doctor';
import { IDiagnostics } from '../models/diagnostics';
import { Patient } from '../models/patient';
import { DiagnosticCenter } from '../models/diagnostic-center';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  urlForPatient = 'http://localhost:5001/api/patient';
  urlForAppointments = 'http://localhost:5006/appointments';
  viewprofiledata: Doctor[];
  bookappointment: IAppointments;
  // appointment: IAppointments;
  viewdcprofiledata: DiagnosticCenter[];
  UserId: string;
  constructor(private http: HttpClient, private service: OnboardingService) { }

  CreateProfile(body) {
    return this.http.post(this.urlForPatient, body);
  }

  getprofile(): Observable<Patient> {
    return this.http.get<Patient>(this.urlForPatient + '/viewprofile');
  }

  updateProfile(body) {
    return this.http.put(this.urlForPatient + '/updateprofile', body);
  }
  searchDoctorsByName(searchbar: string, City: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(
      'http://localhost:5002/api/doctor/search/?city=' +
      City +
      '&name=' +
      searchbar
    );
  }
  searchDoctorsBySpecialization(
    searchbar: string,
    City: string
  ): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(
      'http://localhost:5002/api/doctor/search?city=' +
      City +
      '&specialization=' +
      searchbar
    );
  }
  searchDCByName(searchbar: string, City: string): Observable<DiagnosticCenter[]> {
    return this.http.get<DiagnosticCenter[]>(
      'http://localhost:5002/api/diagnosiscenter/search?city=' +
      City +
      '&dcname=' +
      searchbar
    );
  }
  searchDCByTest(searchbar: string, City: string): Observable<DiagnosticCenter[]> {
    return this.http.get<DiagnosticCenter[]>(
      'http://localhost:5002/api/diagnosiscenter/search?city=' +
      City +
      '&testsConducted=' +
      searchbar
    );
  }
  // data from searched component
  viewdoctorprofile(doctor: Doctor[]) {
    this.viewprofiledata = doctor;
  }
  viewdcprofile(diagnostic: DiagnosticCenter[]) {
    this.viewdcprofiledata = diagnostic;
  }
  bookAppointment(
    userId: string,
    doctorId: string,
    date: Date,
    slotStartTime: Date,
    slotEndTime: Date
  ) {
    console.log(userId, doctorId, date, slotStartTime, slotEndTime);
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.urlForAppointments, {
      attendees: [userId, doctorId],
      Date: date,
      slot: { Date: date, StartTime: slotStartTime, EndTime: slotEndTime }
    });
  }
  // viewPrescriptions(): Observable<IPrescriptions[]> {
  //   return this.http.get<IPrescriptions[]>('http://localhost:3000/prescriptions');
  // }
  dcbookAppointment(
    userId: string,
    diagnosticid: string,
    date: Date,
    slotStartTime: Date,
    slotEndTime: Date
  ) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.urlForAppointments, {
      attendees: [userId, diagnosticid],
      Date: date,
      slot: { Date: date, StartTime: slotStartTime, EndTime: slotEndTime }
    });
  }

  viewAllAppointment(): Observable<IAppointments[]> {
    return this.http.get<IAppointments[]>(this.urlForAppointments + '/allappointments?UserId=' + this.service.userid);
  }
  // viewAppointmentByDate(): Observable<IAppointments> {
  //   return this.http.get<IAppointments>(this.urlForBookAppointments + '/dayappointment?UserId=' + this.service.userid + '&date='  );
  // }
  GetDoctorById(doctorId: string): Observable<Doctor> {
    return this.http.get<Doctor>('http://localhost:5002/api/doctor/' + doctorId);
  }
  GetDiagnosticsById(diagnosticId: string): Observable<IDiagnostics> {
    return this.http.get<IDiagnostics>('http://localhost:5002/api/diagnosiscenter/' + diagnosticId);
  }
}
