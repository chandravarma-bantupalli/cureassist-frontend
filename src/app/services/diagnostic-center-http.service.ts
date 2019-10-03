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
    private service: OnboardingService
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

  getRating(): Observable<Float32Array> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<Float32Array>('http://rating-api.cureassist.cgi-wave7.stackroute.io/rating/doctorrating?DoctorId=' + this.service.userid);
  }

}
