import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-editprofile-page',
  templateUrl: './editprofile-page.component.html',
  styleUrls: ['./editprofile-page.component.css']
})
export class EditprofilePageComponent implements OnInit {

constructor(private fb: FormBuilder, private route: Router, private service: PatientService){ }
formModel = this.fb.group({
  FirstName: ['', Validators.required],
  LastName: ['', Validators.required],
  DateOfBirth: [''],
  BloodGroup: [''],
  UAID: ['', [Validators.required, Validators.pattern('^[0-9]{0,12}$'), Validators.maxLength(12)]],
  Email: ['', [Validators.required, Validators.email]],
  PhoneNumber: ['', [Validators.pattern('^[0-9]{0,10}$'), Validators.maxLength(10)]],
  EmergencyContactNumber: ['', [Validators.pattern('^[0-9]{0,10}$'), Validators.maxLength(10)]],
  Gender: ['', Validators.required],
  city: ['', Validators.required]
});
ngOnInit() {
    this.formModel.reset();
  }
onsubmit() {
 this.service.CreateProfile(this.formModel.value).subscribe(
  data => { console.log( data ), alert('Data added successfully !!')});
}
// update() {
//   this.route.navigate(['patient/View'])
// }
get Phone() {
  return this.formModel.get('PhoneNumber');
}
get PhoneEmergency() {
  return this.formModel.get('EmergencyContactNumber');
}
get email() {
  return this.formModel.get('Email');
}
get gender() {
  return this.formModel.get('Gender');
}
get uaid() {
  return this.formModel.get('UAID');
}
get firstname() {
  return this.formModel.get('FirstName');
}
get lastname() {
  return this.formModel.get('LastName');
}
get city() {
  return this.formModel.get('city');
}
}
