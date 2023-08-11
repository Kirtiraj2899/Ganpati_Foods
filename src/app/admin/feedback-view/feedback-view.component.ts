import { Component } from '@angular/core';
import { Feedback } from 'src/app/model/feedback';
import { FeedbackService } from 'src/app/shared/feedback.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-feedback-view',
  templateUrl: './feedback-view.component.html',
  styleUrls: ['./feedback-view.component.css']
})
export class FeedbackViewComponent {

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

  deleteFeedback(feedback : Feedback) {
    if(window.confirm('Are you sure you want to delete' +feedback.fname+'?')){
      this.feedback.deleteFeedback(feedback);
    }
  }

  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.feedbackList);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, 'products.xlsx');
  }

  saveExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const url: string = window.URL.createObjectURL(data);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
