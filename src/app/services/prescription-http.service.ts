import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prescription } from '../models/prescription';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionHttpService {

  url = environment.prescriptionAPI + '/api/prescription/';

  constructor(
    private http: HttpClient
  ) { }

  addNewPrescription( prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(this.url, prescription);
  }

}
