import { Routes } from '@angular/router';
import { Dashboard } from './modules/dashboard/dashboard';
import { Buildings } from './modules/buildings/buildings';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'buildings', component: Buildings },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' } // Wildcard route for any other path
];

