import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-carousel',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './image-carousel.html',
})
export class ImageCarousel {
  @Input() images: string[] = [];
  currentIndex = 0;

  prev(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}
