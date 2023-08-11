import { Component, Input } from '@angular/core';
import { Feedback } from '../model/feedback';
import { FeedbackService } from '../shared/feedback.service';

@Component({
  selector: 'app-feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.css']
})
export class FeedbackCardComponent {
  @Input() data: any;
  feedbackList : Feedback[] = [];

  constructor(private feedback : FeedbackService){  }

  ngOnInit(): void{
    this.getAllFeedback();
  }

  getAllFeedback() {
    this.feedback.getAllFeedback().subscribe(res =>{

      this.feedbackList = res.map((e: any) =>{
        const data = e.payload.doc.data();
        data.fid = e.payload.doc.id;
        return data;
      })
    }, err =>{
        alert('Error while fetching product data');
    })
  }

}
