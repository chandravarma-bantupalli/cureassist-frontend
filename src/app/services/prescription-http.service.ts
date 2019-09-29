import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prescription } from '../models/prescription';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { ISymptoms, IMedicine } from '../models/prescriptions';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionHttpService {

  url = environment.prescriptionAPI + '/api/prescription/';

  patientId: string;
  doctorId: string;

  constructor(
    private http: HttpClient
  ) { }

  addNewPrescription(prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(this.url, prescription);
  }
  getSymptomsSuggestions(): Observable<ISymptoms> {
    return this.http.get<ISymptoms>('../../../assets/json_files/symptoms.json');
  }
  getMedicineSuggestions(): Observable<IMedicine> {
    return this.http.get<IMedicine>('../../../assets/json_files/medicines.json');
  }
}
