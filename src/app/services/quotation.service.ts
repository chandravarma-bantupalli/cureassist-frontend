import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';
import { Quotation } from '../models/quotation';
import { OnboardingService } from './onboarding.service';
import { Prescriptions } from '../models/prescriptions';
import { environment} from '../../environments/environment.prod';
import { HubConnectionState } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private hubConnection: signalR.HubConnection;
  public quotationRequests: BehaviorSubject<Quotation>;
  public finalQuotation: BehaviorSubject<Quotation>;
  public patientDetails: BehaviorSubject<Prescriptions>;
  // private pharmacyId: string;
  // quotation: Quotation;

  constructor( private service: OnboardingService) {
    this.quotationRequests = new BehaviorSubject<Quotation>(new Quotation());
    this.finalQuotation = new BehaviorSubject<Quotation>(new Quotation());
    this.patientDetails = new BehaviorSubject<Prescriptions>(new Prescriptions());
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.pharmacyAPI + '/notifications')
      .build();
    this.hubConnection.on('ReceiveQuotationRequest', this.onQuotationRequestReceived.bind(this));
    this.hubConnection.on('SelectedQuotation', this.onQuotationReceived.bind(this));
    this.hubConnection.on('PatientDetails', this.onPatientDetailsReceived.bind(this));
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  private onQuotationRequestReceived(quotationRequest) {
    this.quotationRequests.next(quotationRequest);
  }

  private onQuotationReceived(quotation) {
    this.finalQuotation.next(quotation);
    console.log(quotation);
  }

  private onPatientDetailsReceived(patientDetail) {
    this.patientDetails.next(patientDetail);
  }

  // pharmacyOnline(pharmacyPincode) {
  //   if (this.hubConnection.state === HubConnectionState.Disconnected) {
  //     return this.hubConnection.start()
  //       .then(() => {
  //         console.log('Pharmacy online');
  //         this.hubConnection.invoke('Initialize', pharmacyPincode);
  //       });
  //   } else {
  //     console.log('Pharmacy online');
  //     this.hubConnection.invoke('Initialize', pharmacyPincode);
  //   }
  // }

  pharmacyOnline(pharmacyPincode) {
    console.log(pharmacyPincode);
    if (this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
      this.hubConnection.start();
  }
    console.log('Pharmacy online');
    this.hubConnection.invoke('Initialize', pharmacyPincode);
}

  sendQuotation(quotation: Quotation) {
    console.log(quotation);
    if (this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
      this.hubConnection.start();
    }
    quotation.pharmacyId = this.service.userid;
    console.log(quotation);
    this.hubConnection.invoke('ReceiveQuotation', quotation.prescriptionId, quotation);
  }

  requestOrderResponse(prescriptionId: string) {
    if (this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
      this.hubConnection.start().then(() => {
        this.hubConnection.invoke('GetQuotation', prescriptionId);
      });
    } else {
      this.hubConnection.invoke('GetQuotation', prescriptionId);
    }
  }
}
