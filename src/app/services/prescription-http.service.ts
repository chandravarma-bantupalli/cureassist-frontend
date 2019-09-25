import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prescription } from '../models/prescription';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionHttpService {

  url = 'http://localhost:5003/api/prescription/';

  constructor(
    private http: HttpClient
  ) { }

  addNewPrescription( prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(this.url, prescription);
  }

}
