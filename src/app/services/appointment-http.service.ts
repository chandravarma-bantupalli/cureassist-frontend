import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentHttpService {

  url = 'http://localhost:5006/appointments/';
  patientApiUrl = 'http://localhost:5001/api/patient/';

  constructor(
    private http: HttpClient
  ) { }

  getAllAppointmentsOfUser(id: string) {
    return this.http.get<any>(this.url + `allappointments?UserId=${id}`);
  }

  getDayCalendarOfUser(id: string, date: string) {
    return this.http.get<any>(this.url + `dayappointment?UserId=${id}&date=${date}`);
  }

  getDetailsOfAttendee(userid: string) {
    return this.http.get<any>(this.patientApiUrl + `${userid}`);
  }
}
