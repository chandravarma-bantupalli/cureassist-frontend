import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentHttpService {

  url = 'http://appointment-api.cureassist.cgi-wave7.stackroute.io/appointments/';
  patientApiUrl = 'http://patient-api.cureassist.cgi-wave7.stackroute.io/api/patient/';

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
