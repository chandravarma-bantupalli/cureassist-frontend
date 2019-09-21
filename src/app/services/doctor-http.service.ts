import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';
import { TimeSlot } from '../models/time-slot';

@Injectable({
  providedIn: 'root'
})
export class DoctorHttpService {

  URL = 'http://localhost:5002/api/doctor/';

  constructor(
    private http: HttpClient
  ) { }

  addNewDoctor(doc: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.URL, doc);
  }

  getDoctorById(): Observable<Doctor> {
    return this.http.get<Doctor>((this.URL + 'viewprofile'));
  }

  updateDoctor(doctor: Doctor): Observable<Doctor> {
    console.clear();
    console.log(doctor);
    return this.http.put<Doctor>(this.URL, doctor);
  }
}
