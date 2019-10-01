import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../../models/doctor';
import { DiagnosticCenter } from '../../models/diagnostic-center';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
// tslint:disable-next-line:max-line-length
City = [ 'Mumbai' , 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri', 'Patna', 'Vadodara', 'Kempton'];
  doctorByName: Doctor[];
  doctorBySpecialization: Doctor[];
  diagnosticsByTest: DiagnosticCenter[];
  diagnosticsByName: DiagnosticCenter[];
  searchbar: string;
  city: string;
  area: string;
  pincode: any;
  // viewprofiledata: IDoctors[];
  // viewdcprofiledata: IDiagnostics[];
  constructor(private service: PatientService, private route: Router) { }
  getpincode() {
    this.service.getpincodeAPI(this.area).subscribe(data =>
       {console.log(data[0].PostOffice);
        console.log(data);
      this.pincode = data[0].PostOffice.filter(u => (u.District === this.city) && (u.Name === this.area)); 
    this.pincode = this.pincode[0].Pincode;
     console.log(this.pincode);
    });

  }
  searchDoctorsByName(searchbar) {
    this.doctorByName = [];
    this.service.searchDoctorsByName(searchbar, this.city, this.pincode).subscribe(data => this.doctorByName = data);
  }
  searchDoctorBySpecialization(searchbar) {
    this.doctorByName = [];
    this.service.searchDoctorsBySpecialization(searchbar, this.city, this.pincode).subscribe(data => this.doctorByName = data);
  }
  Viewdoctorprofile(doctor) {
    this.service.viewdoctorprofile(doctor);
  }
  searchDCByName(searchbar) {
    this.diagnosticsByTest = [];
    this.service.searchDCByName(searchbar, this.city).subscribe(data => this.diagnosticsByName = data);
  }
  searchDCByTest(searchbar) {
    this.diagnosticsByTest = [];
    this.service.searchDCByTest(searchbar, this.city).subscribe(data => this.diagnosticsByName = data);
  }
  Viewdcprofile(diagnostic) {
    this.service.viewdcprofile(diagnostic);
  }
  viewdoctorprofilecard() {
    this.route.navigate(['patient/viewprofile']);
  }
  viewdcprofilecard() {
    this.route.navigate(['patient/viewdcprofile']);
  }
  // viewAllAppointment() {
  //   this.service.viewAllAppointment().subscribe(data => console.log(data));
  // }
  ngOnInit() {
    this.getpincode();
  }
}
