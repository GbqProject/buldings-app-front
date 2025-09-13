import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatIconModule,
    MatButton,
    RouterModule
  ],
  templateUrl: './dashboard.html',
  standalone: true
})
export class Dashboard {

}
