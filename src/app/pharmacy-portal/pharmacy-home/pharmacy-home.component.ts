import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pharmacy-home',
  templateUrl: './pharmacy-home.component.html',
  styleUrls: ['./pharmacy-home.component.css']
})
export class PharmacyHomeComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  viewprofile() {
    this.route.navigate(['/pharmacy/viewprofile']);
  }
}
