import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiagnosticCenter } from '../models/diagnostic-center';
import { OnboardingService } from './onboarding.service';
import { environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticCenterHttpService {

  URL = environment.doctorsdcAPI + '/api/diagnosiscenter/';

  constructor(
    private http: HttpClient,
  ) { }

  addNewDiagnsoticCenter(dc: DiagnosticCenter): Observable<DiagnosticCenter> {
    return this.http.post<DiagnosticCenter>(this.URL, dc);
  }

  getDiagnosticCenterById(userid: string): Observable<DiagnosticCenter> {
    return this.http.get<DiagnosticCenter>((this.URL + `${userid}`));
  }

  updateDiagnosticCenter(userid: string, dc: DiagnosticCenter): Observable<DiagnosticCenter> {
    return this.http.put<DiagnosticCenter>((this.URL + `${userid}`), dc);
  }

}
