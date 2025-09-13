import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ImageCarousel } from '../image-carousel/image-carousel';

@Component({
  selector: 'app-building-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ImageCarousel
  ],
  templateUrl: './building-card.html',
})
export class BuildingCard {

}
