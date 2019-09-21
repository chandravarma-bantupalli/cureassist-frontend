import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';
import { Quotation } from '../models/quotation';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private hubConnection: signalR.HubConnection;
  public quotationRequests: BehaviorSubject<Quotation>;
  private pharmacyId: string;

  constructor() {
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
    if (this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
       this.hubConnection.start();
    }
    this.pharmacyId = '';
    this.hubConnection.invoke('ReceiveQuotation', this.pharmacyId, quotation);
  }
}
