import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { PaymentGatewateService } from '../shared/payment-gatewate.service';


@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css'],
  template: `
  <h2>Payment Gateway</h2>
  <button (click)="processPayment()">Make Payment</button>
  <div *ngIf="paymentStatus !== null">
    Payment Status: {{ paymentStatus ? 'Successful' : 'Failed' }}
  </div>
`
})
export class PaymentGatewayComponent 
{
  isLoggedIn = false;
  paymentStatus: boolean | null = null;

  constructor(private PaymentService: PaymentGatewateService, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      this.isLoggedIn = !!user;
    });
  }

  processPayment() {
    this.PaymentService.processPayment(100) // Pass the payment amount here
      .subscribe(
        (status) => {
          this.paymentStatus = status;
          window.alert('payment Succefull')
        },
        (error) => {
          this.paymentStatus = false;
        }
      );
  }
}
