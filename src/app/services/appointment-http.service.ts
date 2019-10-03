import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class AppointmentHttpService {

  url = environment.appointmentAPI + '/appointments/';
  patientApiUrl = environment.patientAPI + '/api/patient/';

  dcAppointmentPatientId: string;
  dcId: string;

  constructor(
    private http: HttpClient
  ) { }

  getAllAppointmentsOfUser(id: string) {
    return this.http.get<any>(this.url + `allappointments?UserId=${id}`);
  }

  getDayCalendarOfUser(id: string, date: string) {
    return this.http.get<any>(this.url + `dayappointment?UserId=${id}&date=${date}`);
  }

  getDetailsOfAttendee(userid: string): Observable<Doctor> {
    return this.http.get<Doctor>(this.patientApiUrl + `${userid}`);
  }
}
