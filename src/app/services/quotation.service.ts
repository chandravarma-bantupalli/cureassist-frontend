import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';
import { Quotation } from '../models/quotation';
import { OnboardingService } from './onboarding.service';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private hubConnection: signalR.HubConnection;
  public quotationRequests: BehaviorSubject<Quotation>;
  // private pharmacyId: string;
  // quotation: Quotation;

  constructor( private service: OnboardingService) {
    this.quotationRequests = new BehaviorSubject<Quotation>(new Quotation());
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5005/notifications')
      .build();
    this.hubConnection.on('ReceiveQuotationRequest', this.onQuotationRequestReceived.bind(this));
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  private onQuotationRequestReceived(quotationRequest) {
    this.quotationRequests.next(quotationRequest);
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
      this.hubConnection.start();
    }
    console.log(prescriptionId);
    this.hubConnection.invoke('GetQuotation', prescriptionId);
  }
}
