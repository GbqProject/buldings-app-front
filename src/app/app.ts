import { Component, LOCALE_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';

registerLocaleData(localeEsCO); // <-- This line is CRUCIAL
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
   providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' } // <-- Set locale here
  ],
})
export class App {
  protected readonly title = signal('buildings-app-front');
  isSidenavOpen = signal(false);

  toggleSidenav() {
    this.isSidenavOpen.update(value => !value);
  }
}
