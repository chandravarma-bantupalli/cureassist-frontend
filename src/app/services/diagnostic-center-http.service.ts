import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiagnosticCenter } from '../models/diagnostic-center';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticCenterHttpService {

  URL = 'http://localhost:5002/api/diagnosiscenter/';

  constructor(
    private http: HttpClient
  ) { }

  getDiagnosticCenterById(): Observable<DiagnosticCenter> {
    return this.http.get<DiagnosticCenter>((this.URL + '5d824189b35f127a3fb1916b'));
  }

  updateDiagnosticCenter(dc: DiagnosticCenter): Observable<DiagnosticCenter> {
    return this.http.put<DiagnosticCenter>((this.URL + '5d824189b35f127a3fb1916b'), dc);
  }

}
