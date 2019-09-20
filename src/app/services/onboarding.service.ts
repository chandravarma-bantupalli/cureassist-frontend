import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  url = 'http://localhost:5000/api/user';
  emailId: string;
  userid: string;
  usertype: string;
  doctorId: string;
  constructor(private http: HttpClient, private cookieService: CookieService, private route: Router) { this.http = http; }

  getAlluser(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/users');
  }

  CreateUser(EmailId: string, Usertype: string) {
    return this.http.post(this.url + '/register', { email: EmailId, userType: Usertype });
  }
  LoginUser(EmailId: string, Password: string, Usertype: string) {
    return this.http.post(this.url + '/login', { email: EmailId, password: Password, userType: Usertype });
  }
  SetPassword(Password: string, UserId: string) {
    console.log(Password, UserId);

    return this.http.post(this.url + '/setpassword', { password: Password, userid: UserId });
  }
  isAuthenticate(userAccessToken: string) {
    const tokenInfo = this.getDecodedAccessToken(userAccessToken); // decode token
    this.emailId = tokenInfo.email;
    this.userid = tokenInfo.userid;
    this.usertype = tokenInfo.usertype;
    if (this.cookieService.check('loginToken')) {
      // this.route.navigate(['/homepage']);
      console.log(this.cookieService.get('loginToken'));
      if (window.location.href === 'http://cureassist.com:4200/onboarding/login') {
        this.route.navigate(['/patient/search']);
      } else if (window.location.href === 'http://doctor.cureassist.com:4200/onboarding/login') {
        this.route.navigate(['doctor/home']);
      } else if (window.location.href === 'http://dc.cureassist.com:4200/onboarding/login') {
        this.route.navigate(['diagnosisCenter/home']);
      } else if (window.location.href === 'http://pharmacy.cureassist.com:4200/onboarding/login') {
        this.route.navigate(['pharmacy/home']);
      }
    } else {
      this.cookieService.set('loginToken', userAccessToken);
      console.log(this.cookieService.get('loginToken'));
      this.route.navigate(['/patient/search']);
    }
  }
  Logout() {
    this.cookieService.delete('loginToken');
    this.route.navigate(['onboarding/login']);
    this.emailId = '';
  }
  ResetPassword(oldpassword: string, newpassword: string) {
    return this.http.post(this.url + '/resetpassword', { email: this.emailId, password: oldpassword, newpassword });
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}


