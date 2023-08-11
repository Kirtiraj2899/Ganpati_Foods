import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { FeedbackPageComponent } from '../feedback-page/feedback-page.component';
import { BillItem } from '../model/bill-item';
import { SharedCartService } from '../shared/shared-cart.service';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs; // Import pdfMake using the namespace import



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  isLoggedIn = false;
  billItems: BillItem[] = [];
  totalAmount: number = 0;
  currentDate: Date = new Date();

  constructor(private sharedCartService: SharedCartService,private dialogRef : MatDialog , private afAuth: AngularFireAuth,private router: Router) {}

  ngOnInit(): void {
    this.billItems = this.calculateTotalForItems(this.sharedCartService.cartItems);
    this.totalAmount = this.sharedCartService.totalAmount;
    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      this.isLoggedIn = !!user;
    });
  }

  calculateTotalForItems(items: BillItem[]): BillItem[] {
    return items.map(item => {
      item.total = item.quantity * item.psellprice; // Calculate total amount for each item
      return item;
    });
  }


  
  // async generateAndOpenPDF() {
  //   const docDefinition = {
  //     content: [
  //       // ... define your PDF content here ...
  //       // Example: Use the table HTML to generate the table in the PDF
  //       // Modify the content to match your invoice layout
        
  //       {
  //         text: 'Ganpati Foods', // Your company name
  //         style: 'compName', // Apply the 'compName' style from your CSS
  //       },
  //       {
  //         text: 'JQJR+6Q2,Ganpati Foods, Gawade Nagar, Pimpri-chinchwad Link Road, Opp to Gawade petrol pump, Pune - 411033.',
  //         style: 'address', // Apply the 'address' style from your CSS
  //       },
  //       {
  //         text: 'Invoice',
  //         style: 'invoice', // Apply the 'address' style from your CSS
  //       },
  //       // ... Add the rest of your invoice content here ...
  //     ],
  //     styles: {
  //       // Define your custom styles here, similar to your CSS styles
  //       compName: {
  //         fontSize: 40,
  //         color: '#8a0808',
  //         marginLeft: 40,
  //         marginTop: 30,
  //         fontWeight: 600,
  //         fontFamily: 'Abhaya Libre, serif',
  //       },
  //       address: {
  //         fontSize: 14,
  //         fontWeight: 200,
  //         marginLeft: 140,
  //         marginBottom: 5,
  //         textAlign: 'center',
  //       },
  //       invoice: {
  //         fontSize: 40,
  //         marginLeft: 40,
  //         marginTop: 30,
  //         fontWeight: 800,
  //         fontFamily: 'Abhaya Libre, serif',
          
  //       },
  //     },
  //   };

  //   // Generate the PDF
  //   const pdfDocGenerator = pdfMake.createPdf(docDefinition);

  //   // Get the blob representing the PDF content
  //   const pdfBlob = await this.getPdfBlob(pdfDocGenerator);

  //   // Show print preview
  //   const pdfUrl = URL.createObjectURL(pdfBlob);
  //   const printWindow = window.open(pdfUrl, '_blank');
  //   if (!printWindow) {
  //     alert('Your browser is blocking pop-ups. Please allow pop-ups and try again.');
  //     return;
  //   }

  //   // After the user finishes print preview, download the PDF
  //   printWindow.onafterprint = () => {
  //     const pdfFileName = 'invoice.pdf'; // Change the filename if needed
  //     this.downloadPdf(pdfBlob, pdfFileName);
  //     URL.revokeObjectURL(pdfUrl); // Clean up the object URL after downloading
  //   };
  // }

  // async getPdfBlob(pdfDocGenerator: any): Promise<Blob> {
  //   return new Promise((resolve, reject) => {
  //     pdfDocGenerator.getBlob((pdfBlob: Blob) => {
  //       resolve(pdfBlob);
  //     }, (error: any) => {
  //       reject(error);
  //     });
  //   });
  // }

  // downloadPdf(pdfBlob: Blob, fileName: string) {
  //   const downloadLink = document.createElement('a');
  //   downloadLink.href = URL.createObjectURL(pdfBlob);
  //   downloadLink.download = fileName;
  //   downloadLink.click();
  // }
  
  
  printPage() {
    window.print();
    // this.router.navigate(['/feedback']);
    this.openDialogfeedback();
  }

  openDialogfeedback(){
    this.dialogRef.open(FeedbackPageComponent);
  }
}

