import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent {
  images: string[] = [
    'assets/Images/Homeimg.jpg',
    'assets/Images/ContactUsimg.avif',
    'assets/Images/Productimg.jpeg',
    // Add more image URLs as needed
  ];

  slideOffset = 0;
  slideWidth = 0;

  @ViewChild('slider', { static: true }) slider!: ElementRef;

  ngAfterViewInit() {
    this.slideWidth = this.slider.nativeElement.offsetWidth;
  }

  prevSlide() {
    this.slideOffset += this.slideWidth;
    if (this.slideOffset >= 0) {
      this.slideOffset = -this.slideWidth * (this.images.length - 1);
    }
  }

  nextSlide() {
    this.slideOffset -= this.slideWidth;
    if (this.slideOffset <= -this.slideWidth * (this.images.length - 1)) {
      this.slideOffset = 0;
    }
  }
 
}
