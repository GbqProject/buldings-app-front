import { Component, inject, OnInit } from '@angular/core';
import { BuildingCard } from './components/building-card/building-card';
import { BuildingsFilters } from './components/buildings-filters/buildings-filters';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { CreateBuildingFormComponent } from './components/create-building/create-building';

@Component({
  selector: 'app-buildings',
  imports: [
    BuildingCard,
    BuildingsFilters,
    MatButtonModule
  ],
  templateUrl: './buildings.html',
})
export class Buildings implements OnInit {
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.openDialog()
  }

  openDialog() {
  this.dialog.open(CreateBuildingFormComponent, {
    data: {},
    width: '90vw',       // ✅ Takes 90% of viewport width
    maxWidth: '90vw',    // ✅ Overrides Angular Material's default max-width (80vw)

  });
}

}
