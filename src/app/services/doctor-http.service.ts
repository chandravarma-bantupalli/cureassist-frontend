import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';
import { TimeSlot } from '../models/time-slot';
import { OnboardingService } from './onboarding.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorHttpService {

  URL = 'http://localhost:5002/api/doctor/doctorId';

  constructor(
    private http: HttpClient,
    private onboardingService: OnboardingService
  ) { }

  getDoctorById(): Observable<Doctor> {
    return this.http.get<Doctor>((this.URL));
  }

  updateDoctor(doctor: Doctor): Observable<Doctor> {
    console.clear();
    console.log(doctor);
    return this.http.put<Doctor>(this.URL, doctor);
  }
}
