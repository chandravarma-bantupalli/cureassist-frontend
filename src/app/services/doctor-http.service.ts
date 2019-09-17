import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../Models/doctor';
import { TimeSlot } from '../models/time-slot';

@Injectable({
  providedIn: 'root'
})
export class DoctorHttpService {

  URL = 'http://localhost:5002/api/doctor/';

  constructor(private http: HttpClient) { }

  getDoctorById(): Observable<Doctor> {
    return this.http.get<Doctor>((this.URL + '5d80c13d97a6e00b188dc87b'));
  }

  updateDoctor(doctor: Doctor): Observable<Doctor> {
    console.clear();
    console.log(doctor);
    return this.http.put<Doctor>((this.URL + '5d80c13d97a6e00b188dc87b'), doctor);
  }

  getTimeSlotsOfDoctor(): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>((this.URL + '5d80c13d97a6e00b188dc87b/timeslots'));
  }
}
