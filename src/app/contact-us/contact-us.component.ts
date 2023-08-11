import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ContactUs } from '../model/contact-us';
import { ContactUsService } from '../shared/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

 isLoggedIn = false;

  

  contactObj : ContactUs ={
    contid: '',
    contfname: '',
    contlname: '',
    contemail: '',
    contmobile: '',
    contdesc: '',

  };

  contid : string = '';
  contfname : string = '';
  contlname : string = '';
  contemail: string = '';
  contmobile : string = '';
  contdesc : string = '';
 

  constructor(private contacctus : ContactUsService,private afAuth: AngularFireAuth){ 
    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      this.isLoggedIn = !!user;
    });
   }

  

  resetForm() {
    this.contfname  = '';
    this.contlname  = '';
    this.contemail= '';
    this.contmobile  = '';
    this.contdesc  = '';
  }

  addContactUS() {
    if(this.contfname == '' || this.contlname == '' || this.contemail== '' || this.contmobile == '' || this.contdesc == ''){
      alert('Fill all inputes fields');
    }
    else{

    this.contactObj.contid = '';
    this.contactObj.contfname = this.contfname;
    this.contactObj.contlname = this.contlname;
    this.contactObj.contemail = this.contemail
    this.contactObj.contmobile = this.contmobile;
    this.contactObj.contdesc = this.contdesc;
 

    this.contacctus.addContactUS(this.contactObj);
    this.resetForm();
    alert('data insert successfully')
  }
  }

}
