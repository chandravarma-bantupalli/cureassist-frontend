import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeSlot } from '../models/time-slot';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment.prod';
import { OnboardingService } from './onboarding.service';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  DOCTOR_TS_URL = environment.doctorsdcAPI + '/api/doctor/';
  DC_TS_URL = environment.doctorsdcAPI + '/api/diagnosiscenter/';
  singleTimeSlot: TimeSlot;
  timeSlotId: string;
  dcId: string;
  doctorId: string;

  constructor(
    private http: HttpClient,
    private service: OnboardingService
  ) { }

  getDiagnosticCenterTimeSlots(id: string): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>((this.DC_TS_URL + `${id}/` + 'timeslots'));
  }

  updateDiagnosticCenterTimeSlot(id: string, tsId: string, timeSlot: TimeSlot): Observable<TimeSlot> {
    return this.http.put<TimeSlot>((this.DC_TS_URL + `${id}/` + 'timeslots/' + `${tsId}`), timeSlot);
  }

  getSingleTimeSlotOfDiagnosticCenter(id: string, tsId: string): Observable<TimeSlot> {
    return this.http.get<TimeSlot>((this.DC_TS_URL + `${id}/` + 'timeslots/' + `${tsId}`));
  }

  addNewTimeSlotToDiagnosticCenter(dcId: string, ts: TimeSlot) {
    return this.http.post<TimeSlot>((this.DC_TS_URL + `${dcId}/` + 'timeslots'), ts);
  }
  // This is for doctor//
  getDoctorTimeSlots(id: string): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>((this.DOCTOR_TS_URL + `${id}` + '/timeslots'));
  }

  updateDoctorTimeSlot(id: string, tsId: string, timeSlot: TimeSlot): Observable<TimeSlot> {
    return this.http.put<TimeSlot>((this.DOCTOR_TS_URL + `${id}` + '/timeslots/' + `${tsId}`), timeSlot);
  }

  getSingleTimeSlotOfDoctor(id: string, tsId: string): Observable<TimeSlot> {
    return this.http.get<TimeSlot>((this.DOCTOR_TS_URL + `${id}` + '/timeslots/' + `${tsId}`));
  }

  addNewTimeSlotToDoctor(ts: TimeSlot): Observable<TimeSlot> {
    return this.http.post<TimeSlot>((this.DOCTOR_TS_URL + this.service.userid + '/timeslots'), ts);
  }
}
