import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';
import { TimeSlot } from '../models/time-slot';
import { environment} from '../../environments/environment.prod';
import { OnboardingService } from './onboarding.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorHttpService {

  URL = environment.doctorsdcAPI + '/api/doctor';

  constructor(
    private http: HttpClient, private service: OnboardingService
  ) { }

  addNewDoctor(doc: Doctor): Observable<Doctor> {
    console.log(doc);
    return this.http.post<Doctor>(this.URL , doc);
  }

  getDoctorById(userid: string): Observable<Doctor> {
    return this.http.get<Doctor>((this.URL + '/' + `${userid}`));
  }

  updateDoctor(userid: string, doctor: Doctor): Observable<Doctor> {
    console.log(doctor);
    return this.http.put<Doctor>((this.URL + '/' +  `${userid}`), doctor);
  }
}
