import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Feedback } from '../model/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private afs : AngularFirestore,private fireauth: AngularFireAuth, private router: Router) { }

  //add Feedback

addFeedback(feedback : Feedback){
  feedback.fid = this.afs.createId();
  return this.afs.collection('/Feedbacks').add(feedback);
}

//get all Feedback

getAllFeedback(){
  return this.afs.collection('/Feedbacks').snapshotChanges();
}

//delete ContactUs

deleteFeedback(feedback : Feedback){
  return this.afs.doc('/Feedbacks/'+feedback.fid).delete();
}
}

