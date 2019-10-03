import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { TestReports } from '../models/testreports';

@Injectable({
  providedIn: 'root'
})
export class TestReportsService {

  URL = environment.testreportAPI + '/api/testreports';

  constructor(
    private http: HttpClient
  ) { }

  getAllTestReports() {
    return this.http.get<TestReports[]>(this.URL);
  }

  uploadTestReport(patientId: string, fd: FormData, testName: string, tr: TestReports) {
    return this.http.post( (this.URL + `/${patientId}/upload/${testName}`), fd, {reportProgress: true});
  }

  getLinkToReport(patientId: string, fileName: string) {
    return this.http.get(this.URL + `/${patientId}/report/${fileName}/link`, {responseType: 'text'});
  }
}
