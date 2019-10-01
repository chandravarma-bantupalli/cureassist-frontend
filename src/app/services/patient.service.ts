import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OnboardingService } from './onboarding.service';
import { IAppointments } from '../models/appointment';
import { Doctor } from '../models/doctor';
import { IDiagnostics } from '../models/diagnostics';
import { Patient, ISymptomsBySuggestions } from '../models/patient';
import { DiagnosticCenter } from '../models/diagnostic-center';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  urlForPatient = environment.patientAPI + '/api/patient';
  urlForAppointments = environment.appointmentAPI + '/appointments';
  viewprofiledata: Doctor;
  bookappointment: IAppointments;
  // appointment: IAppointments;
  viewdcprofiledata: DiagnosticCenter;
  UserId: string;
  doctorUserId: string;
  dcuserid: string;
  constructor(private http: HttpClient, private service: OnboardingService) {}

  CreateProfile(body) {
    return this.http.post(this.urlForPatient, body);
  }

  getprofile(): Observable<Patient> {
    return this.http.get<Patient>(this.urlForPatient + '/viewprofile');
  }

  updateProfile(body) {
    return this.http.put(this.urlForPatient + '/updateprofile', body);
  }
  //to get the pincode by areanames
  getpincodeAPI(city): Observable<any> {
    return this.http.get('/postoffice/' + city, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      }
    });
  }
  //   getpincodeAPI(city): Observable<any> {
  //   return this.http.get(environment.pincodeAPI + city, {
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Headers': '*'
  //     }
  //   });
  // }
  searchDoctorsByName(
    searchbar: string,
    City: string,
    pincode: string
  ): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(
      environment.doctorsdcAPI +
        '/api/doctor/search?city=' +
        City +
        '&name=' +
        searchbar +
        '&pincode=' +
        pincode
    );
  }

  searchDoctorsBySpecialization(
    searchbar: string,
    City: string,
    pincode: string
  ): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(
      environment.doctorsdcAPI +
        '/api/doctor/search?city=' +
        City +
        '&specialization=' +
        searchbar +
        '&pincode=' +
        pincode
    );
  }
  searchDCByName(
    searchbar: string,
    City: string
  ): Observable<DiagnosticCenter[]> {
    return this.http.get<DiagnosticCenter[]>(
      environment.doctorsdcAPI +
        '/api/diagnosiscenter/search?city=' +
        City +
        '&dcname=' +
        searchbar
    );
  }
  searchDCByTest(
    searchbar: string,
    City: string
  ): Observable<DiagnosticCenter[]> {
    return this.http.get<DiagnosticCenter[]>(
      environment.doctorsdcAPI +
        '/api/diagnosiscenter/search?city=' +
        City +
        '&testsConducted=' +
        searchbar
    );
  }
  getDoctorBySymptoms(): Observable<ISymptomsBySuggestions[]> {
    return this.http.get<ISymptomsBySuggestions[]>(
      '../../../assets/json_files/specializationANDsymptoms.json'
    );
  }
  // data from searched component
  viewdoctorprofile(doctor: Doctor) {
    this.doctorUserId = doctor.userid;
    console.log(this.doctorUserId);
    this.viewprofiledata = doctor;
  }
  viewdcprofile(diagnostic: DiagnosticCenter) {
    this.dcuserid = diagnostic.userid;
    this.viewdcprofiledata = diagnostic;
  }
  bookAppointment(
    userId: string, // userId for the patient
    userid: string, // userid for the doctor
    date: Date,
    slotStartTime: Date,
    slotEndTime: Date
  ) {
    userid = this.doctorUserId;
    console.log(userId, userid, date, slotStartTime, slotEndTime);
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.urlForAppointments, {
      attendees: [userId, userid],
      Date: date,
      slot: { Date: date, StartTime: slotStartTime, EndTime: slotEndTime }
    });
  }
  dcbookAppointment(
    userId: string,
    userid: string,
    date: Date,
    slotStartTime: Date,
    slotEndTime: Date
  ) {
    userid = this.dcuserid;
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.urlForAppointments, {
      attendees: [userId, userid],
      Date: date,
      slot: { Date: date, StartTime: slotStartTime, EndTime: slotEndTime }
    });
  }

  viewAllAppointment(): Observable<IAppointments[]> {
    return this.http.get<IAppointments[]>(
      this.urlForAppointments + '/allappointments?UserId=' + this.service.userid
    );
  }

  GetDoctorById(userid: string): Observable<Doctor> {
    return this.http.get<Doctor>(
      environment.doctorsdcAPI + '/api/doctor/' + userid
    );
  }
  GetDiagnosticsById(diagnosticId: string): Observable<IDiagnostics> {
    return this.http.get<IDiagnostics>(
      environment.doctorsdcAPI + '/api/diagnosiscenter/' + diagnosticId
    );
  }

  getPatientByUserId(id: string): Observable<Patient> {
    return this.http.get<Patient>(this.urlForPatient + `/${id}`);
  }
}
