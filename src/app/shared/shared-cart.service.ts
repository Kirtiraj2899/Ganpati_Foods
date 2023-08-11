import { Injectable } from '@angular/core';
import { BillItem } from '../model/bill-item';

@Injectable({
  providedIn: 'root'
})
export class SharedCartService {

  cartItems: BillItem[] = [];
  totalAmount: number = 0;
  constructor() { }
}
