import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { BuildingService } from '../../buildings-service';

@Component({
  selector: 'app-building-form',
  templateUrl: './create-building.html',
  imports:[
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule
  ]
})
export class CreateBuildingFormComponent {
  buildingForm: FormGroup;
  uploadedImages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private _buildingService: BuildingService
  ) {
    this.buildingForm = this.fb.group({
      city: ['Bucaramanga', Validators.required],
      room_amount: [2, Validators.required],
      bathroom_amount: [1, Validators.required],
      type_consignement: ['lease', Validators.required],
      rental_value: [1000],
      sale_value: [0],
      images: [[]],
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      for (const file of Array.from(target.files)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.uploadedImages.push(reader.result as string);
          this.buildingForm.patchValue({ images: this.uploadedImages });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit() {
    if (this.buildingForm.valid) {
      this._buildingService.create(this.buildingForm.value).subscribe({
        next: (building) => console.log('Created:', building),
        error: (err) => console.error('Error creating building:', err)
      });
    }
  }

  onUpdate(id: number) {
    if (this.buildingForm.valid) {
      this._buildingService.update(id, this.buildingForm.value).subscribe({
        next: (building) => console.log('Updated:', building),
        error: (err) => console.error('Error updating building:', err)
      });
    }
  }
}

