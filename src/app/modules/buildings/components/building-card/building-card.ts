import { Component, Input, LOCALE_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ImageCarousel } from '../image-carousel/image-carousel';
import { Building } from '../../buildings-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-building-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ImageCarousel,
    CommonModule
  ],
  templateUrl: './building-card.html',
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' }
  ]
})
export class BuildingCard {
  @Input() item: Building = {
    city: 'Bucaramanga',
    room_amount: 4,
    bathroom_amount: 1,
    type_consignement: 'sale',
    rental_value: 1000,
    sale_value: 2000,
    images_base_64: []
  }
}
