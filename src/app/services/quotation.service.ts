import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';
import { Quotation } from '../models/quotation';
import { OnboardingService } from './onboarding.service';
import { Prescriptions } from '../models/prescriptions';
import { environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private hubConnection: signalR.HubConnection;
  public quotationRequests: BehaviorSubject<Quotation>;
  public finalQuotation: BehaviorSubject<Quotation>;
  public patientDetails: BehaviorSubject<Prescriptions>;

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

// pharmacyOnline(pharmacyPincode: string) {
//   console.log('i am in pharmacyOnline', pharmacyPincode);
//   if (this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
//     this.hubConnection.start().then(() => {
//       this.hubConnection.invoke('Initialize', pharmacyPincode);
//       console.log('Pharmacy online 1');
//     });
//   } else {
//     this.hubConnection.invoke('Initialize', pharmacyPincode);
//     console.log('Pharmacy online 2');
//   }
// }

pharmacyOnline(pharmacyPincode: string) {
  if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
    this.hubConnection.invoke('Initialize', pharmacyPincode);
    console.log('Pharmacy online');
  } else {
    this.hubConnection.start().then(() => {
      this.hubConnection.invoke('Initialize', pharmacyPincode);
    });
  }
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
