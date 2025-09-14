import { BuildingService } from './buildings-service';
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
    this.getBuildings();
    // this.filterBuildings()
    // this.openDialog()
  }

  openDialog() {
    this.dialog.open(CreateBuildingFormComponent, {
      data: {},
      width: '90vw',       // ✅ Takes 90% of viewport width
      maxWidth: '90vw',    // ✅ Overrides Angular Material's default max-width (80vw)
    });
  }

  getBuildings() {
    this._buildingService.get().subscribe({
      next: (res => {
        console.log('res', res);
        this.buildings = res;
        this.buildings.forEach((element: any) => {
          //[0].images[0].base_64
          element.images_base_64 = element.images.map((i: { base_64: any; })=>i.base_64);
        });
        console.log('buildings', this.buildings);
      }),
    })
  }

  filterBuildings() {
    this._buildingService.getBuildings({
      city: 'Bogotá',
      value_min: 1000000,
      value_max: 3000000,
      room_amount: [2, 4]
    }).subscribe(data => {
      console.log('filtered buildings', data);
      // this.buildings = data;
    });
  }


}
