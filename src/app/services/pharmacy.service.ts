import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pharmacy } from '../models/pharmacy';
import { environment} from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class PharmacyService {
  urlpost = environment.pharmacyAPI + '/api/pharmacy';
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  formModel = this.fb.group({
    pharmacyName: ['', Validators.required],
    pharmacyLocation: ['', Validators.required],
    pharmacyPincode: ['', Validators.required],
    pharmacyRegisterNumber: ['', Validators.required],
    phoneNumber: ['', Validators.maxLength(10)],
    emailId: ['', Validators.required]
   });
   CreateProfile() {
     return this.http.post(this.urlpost, this.formModel.value);
   }

  getPharmacy(): Observable<Pharmacy> {
    return this.http.get<Pharmacy>(this.urlpost + '/viewprofile');
  }

   updateprofile(body) {
     return this.http.put(this.urlpost + '/editprofile', body);
   }
}
