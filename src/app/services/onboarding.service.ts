import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { User } from '../models/user';
import { environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  url = environment.onboardingAPI + '/api/user';
  emailId: string;
  userid: string;
  usertype: string;
  user: any;
  userIdDemo: string;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private route: Router
  ) {
    // this.userIdDemo = '2bf06dd0-2bfa-4cba-8966-6c2ffe9839c1';
    // const token = this.cookieService.get('loginToken');
    // this.user = this.getDecodedAccessToken(token);
    // console.log(this.user);
    // this.userid = this.user.userid;
    // // this.emailId = this.user.email;
  }

  getAlluser(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/users');
  }

  CreateUser(EmailId: string, Usertype: string) {
    return this.http.post(this.url + '/register', { EmailId, UserType: Usertype });
  }
  LoginUser(EmailId: string, Password: string, Usertype: string) {
    return this.http.post(this.url + '/login', { EmailId, Password, UserType: Usertype });
  }
  SetPassword(Password: string, UserId: string) {
    console.log(Password, UserId);
    this.userid = UserId;

    if ((window.location.href).includes('patient')) {
      this.route.navigate(['/patient/profile/post']);
    } else if ((window.location.href).includes('doctor')) {
      this.route.navigate(['/doctor/home']);
    } else if ((window.location.href).includes('dc')) {
      this.route.navigate(['diagnosisCenter/home']);
    } else if ((window.location.href).includes('pharmacy')) {
      this.route.navigate(['pharmacy/home']);
    }

    return this.http.post(this.url + '/setpassword', { password: Password, userid: UserId });
  }

  isAuthenticate(userAccessToken: string) {
    // const tokenInfo = this.getDecodedAccessToken(userAccessToken); // decode token
    // const savedtokenInfo = this.getDecodedAccessToken(this.cookieService.get('loginToken'))
    // this.emailId = tokenInfo.email;
    // this.userid = tokenInfo.userid;
    // this.usertype = tokenInfo.usertype;
    // if (this.cookieService.check('loginToken')) {
    //   // this.route.navigate(['/homepage']);
    //   console.log(this.cookieService.get('loginToken'));
    //   if (window.location.href === 'http://cureassist.com:4200/onboarding/login') {
    //     this.route.navigate(['/patient/search']);
    //   } else if (window.location.href === 'http://doctor.cureassist.com:4200/onboarding/login') {
    //     this.route.navigate(['doctor/home']);
    //   } else if (window.location.href === 'http://dc.cureassist.com:4200/onboarding/login') {
    //     this.route.navigate(['diagnosisCenter/home']);
    //   } else if (window.location.href === 'http://pharmacy.cureassist.com:4200/onboarding/login') {
    //     this.route.navigate(['pharmacy/home']);
    //   }
    // } else {
    //   this.cookieService.set('loginToken', userAccessToken);
    //   console.log(this.cookieService.get('loginToken'));
    //   if (window.location.href === 'http://cureassist.com:4200/onboarding/login') {
    //     this.route.navigate(['/patient/search']);
    //   } else if (window.location.href === 'http://doctor.cureassist.com:4200/onboarding/login') {
    //     this.route.navigate(['doctor/home']);
    //   } else if (window.location.href === 'http://dc.cureassist.com:4200/onboarding/login') {
    //     this.route.navigate(['diagnosisCenter/home']);
    //   } else if (window.location.href === 'http://pharmacy.cureassist.com:4200/onboarding/login') {
    //     this.route.navigate(['pharmacy/home']);
    //   }
    // }
    // const savedtokenInfo = this.cookieService.get('loginToken');
    // if (!(userAccessToken === savedtokenInfo)) {
    //   this.cookieService.delete('loginToken');
    //   this.cookieService.set('loginToken', userAccessToken);
    // }
    if (this.cookieService.get('loginToken') !== userAccessToken) {
      this.cookieService.delete('loginToken');
      this.cookieService.set('loginToken', userAccessToken, 2147483647, '/', '.cureassist.cgi-wave7.stackroute.io');
    }
    // this.cookieService.deleteAll();
    const tokenInfo = this.getDecodedAccessToken(userAccessToken); // decode token
    this.emailId = tokenInfo.EmailId;
    console.log(this.emailId);
    this.userid = tokenInfo.UserId;
    console.log(this.userid);
    this.usertype = tokenInfo.UserType;
    console.log(this.usertype);
    if ((window.location.href).includes('patient')) {
      this.route.navigate(['patient/home']);
    } else if ((window.location.href).includes('doctor')) {
      this.route.navigate(['doctor/home']);
    } else if ((window.location.href).includes('dc')) {
      this.route.navigate(['diagnosisCenter/home']);
    } else if ((window.location.href).includes('pharmacy')) {
      this.route.navigate(['pharmacy/home']);
    }

  }

  Logout() {
    this.cookieService.delete('loginToken');
    this.emailId = '';
    this.userid = '';
    this.usertype = '';
    this.route.navigate(['onboarding/login']);
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


