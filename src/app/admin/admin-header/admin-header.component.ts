import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

  @Output() toggleSidebarForMe:EventEmitter<any> = new EventEmitter();
  
  

  toggleSidebar(){
    this.toggleSidebarForMe.emit();
  }

  constructor(private router: Router){}

  logout(){
    localStorage.removeItem('admin');
    this.router.navigate(['/'])
  }


}
