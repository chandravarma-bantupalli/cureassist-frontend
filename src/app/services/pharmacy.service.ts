import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pharmacy } from '../models/pharmacy';


@Injectable({
  providedIn: 'root'
})
export class PharmacyService {
  urlpost = 'http://localhost:5005/api/pharmacy';
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  formModel = this.fb.group({
    pharmacyId: [''],
    pharmacyName: ['', Validators.required],
    pharmacyRegisterNumber: ['', Validators.required],
    pharmacyLocation: ['', Validators.required],
    emailId: ['', Validators.required],
    phoneNumber: ['', Validators.maxLength(10)]
   });
   CreateProfile() {
     return this.http.post(this.urlpost, this.formModel.value);
   }
  //  getPharmacy(email): Observable<Pharmacy> {
  //    return this.http.get<Pharmacy>(this.urlpost + '/' + email);
  //  }
  getPharmacy(): Observable<Pharmacy> {
    return this.http.get<Pharmacy>(this.urlpost + '/viewprofile');
  }
   updateprofile(body) {
     return this.http.put(this.urlpost, body);
   }
}
