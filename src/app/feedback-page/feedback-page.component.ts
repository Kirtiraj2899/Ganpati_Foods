import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import firebase from 'firebase/compat/app';
import { Feedback } from '../model/feedback';
import { FeedbackService } from '../shared/feedback.service';
import { ThankYouComponent } from '../thank-you/thank-you.component';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent {

  isLoggedIn = false;

  feedbackObj : Feedback ={
    fid: '',
    fname: '',
    femail: '',
    fdesc: '',

  };

  fid : string = '';
  fname : string = '';
  femail: string = '';
  fdesc : string = '';
 

  constructor(private feedback : FeedbackService , private afAuth: AngularFireAuth ,private dialogRef : MatDialog){

    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      this.isLoggedIn = !!user;
    });
    }

  

  resetForm() {
    this.fname  = '';
    this.femail  = '';
    this.fdesc= '';
  }

  addFeedback() {
    if(this.fname == '' || this.femail == '' || this.fdesc== '' ){
      alert('Fill all inputes fields');
    }
    else{

    this.feedbackObj.fid = '';
    this.feedbackObj.fname = this.fname;
    this.feedbackObj.femail = this.femail;
    this.feedbackObj.fdesc = this.fdesc;
 

    this.feedback.addFeedback(this.feedbackObj);
    this.resetForm();
    alert('data insert successfully')
    this.openDialogthanktou();
  }
  }

  openDialogthanktou(){
    this.dialogRef.open(ThankYouComponent);
  }
  
}
