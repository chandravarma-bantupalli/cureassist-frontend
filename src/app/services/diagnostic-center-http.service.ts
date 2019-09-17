import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiagnosticCenter } from '../models/diagnostic-center';
import { TimeSlot } from '../models/time-slot';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticCenterHttpService {

  URL = 'http://localhost:5002/api/diagnosiscenter/';

  constructor(
    private http: HttpClient
  ) { }

  getDiagnosticCenterById(): Observable<DiagnosticCenter> {
    return this.http.get<DiagnosticCenter>((this.URL + '5d808d6a1a63b8706ce22c11'));
  }

  updateDiagnosticCenter(dc: DiagnosticCenter): Observable<DiagnosticCenter> {
    console.clear();
    console.log(dc);
    return this.http.put<DiagnosticCenter>((this.URL + '5d808d6a1a63b8706ce22c11'), dc);
  }

  getTimeSlotsOfDiagnosisCenter(): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>((this.URL + '5d808d6a1a63b8706ce22c11/timeslots'));
  }

}
