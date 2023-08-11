import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private customer : CustomerService , private auth : AuthService) {}

  cemail:string='';
  cpassword:string='';

  register() {
    this.auth.register(this.cemail,this.cpassword);
  }

}
