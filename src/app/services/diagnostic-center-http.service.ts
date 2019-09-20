import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiagnosticCenter } from '../models/diagnostic-center';
import { OnboardingService } from './onboarding.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticCenterHttpService {

  URL = 'http://localhost:5002/api/diagnosiscenter/';

  constructor(
    private http: HttpClient,
    private onboardingService: OnboardingService
  ) { }

  addNewDiagnsoticCenter(dc: DiagnosticCenter): Observable<DiagnosticCenter> {
    return this.http.post<DiagnosticCenter>(this.URL, dc);
  }

  getDiagnosticCenterById(): Observable<DiagnosticCenter> {
    return this.http.get<DiagnosticCenter>((this.URL + this.onboardingService.userid));
  }

  updateDiagnosticCenter(dc: DiagnosticCenter): Observable<DiagnosticCenter> {
    return this.http.put<DiagnosticCenter>((this.URL + this.onboardingService.userid), dc);
  }

}
