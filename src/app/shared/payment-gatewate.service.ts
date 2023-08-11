import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentGatewateService {

  constructor() {}

  processPayment(amount: number): Observable<boolean> {
    // Simulate processing the payment.
    // In a real payment gateway, you would interact with the actual payment API here.
    // For the dummy service, we'll just return a success response after a short delay.

    // Simulate a delay of 2 seconds to mimic processing time.
    return new Observable<boolean>((observer) => {
      setTimeout(() => {
        observer.next(true); // Payment successful
        observer.complete();
      }, 2000);
    });
  }

}
