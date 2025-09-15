import { Building, BuildingService } from './buildings-service';
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
  buildings: any = [];

  constructor(
    private _buildingService: BuildingService,
  ) { }

  ngOnInit(): void {
    // this.openDialog()
  }

  openDialog(data?: Building) {
    this.dialog.open(CreateBuildingFormComponent, {
      data: data,
      width: '70vw',       // ✅ Takes 90% of viewport width
      maxWidth: '70vw',    // ✅ Overrides Angular Material's default max-width (80vw)
    });
    this.dialog.afterAllClosed.subscribe(res => {
      this.filterBuildings({});
    })
  }

  filterBuildings(data: any) {
    this._buildingService.getBuildings(data).subscribe(res => {
      this.buildings = res;
      this.buildings.forEach((element: any) => {
        element.images_base_64 = element.images.map((i: { base_64: any; }) => i.base_64);
      });
    });
  }

  delete(id: number) {
    this._buildingService.deleteBuilding(id).subscribe({
      next: () => {
        // Remove from the array so the UI updates
        this.buildings = this.buildings.filter((b: { id: number; }) => b.id !== id);
      },
      error: err => console.error('Error deleting building', err)
    });
  }

}
