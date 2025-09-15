import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Building, BuildingService } from '../../buildings-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-building-form',
  templateUrl: './create-building.html',
  imports: [
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule
  ]
})
export class CreateBuildingFormComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<CreateBuildingFormComponent>);
  readonly data = inject<Building>(MAT_DIALOG_DATA);
  buildingForm: FormGroup;
  uploadedImages: string[] = [];
  is_updating = false;

  constructor(
    private fb: FormBuilder,
    private _buildingService: BuildingService
  ) {
    // this.buildingForm = this.fb.group({
    //   city: ['Bucaramanga', Validators.required],
    //   room_amount: [2, Validators.required],
    //   bathroom_amount: [1, Validators.required],
    //   type_consignement: ['lease', Validators.required],
    //   rental_value: [1000],
    //   sale_value: [0],
    //   images: [[]],
    // });
    this.buildingForm = this.fb.group({
      city: ['', Validators.required],
      room_amount: [0, Validators.required],
      bathroom_amount: [0, Validators.required],
      type_consignement: ['', Validators.required],
      rental_value: [],
      sale_value: [],
      images: [[]],
    });
  }
  ngOnInit(): void {
    console.log('dialog data', this.data);

    if (this.data) {
      this.is_updating = true;
      this.uploadedImages = this.data.images_base_64 ?? [];
      this.buildingForm.patchValue({...this.data, images: this.uploadedImages});
    }

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
    if(this.is_updating){
      return this.onUpdate(this.data.id??0);
    }
    return this.onCreate();
  }

  onCreate() {
    if (this.buildingForm.valid) {
      this._buildingService.create(this.buildingForm.value).subscribe({
        next: (building) => {
          this.dialogRef.close();
        },
        error: (err) => console.error('Error creating building:', err)
      });
    }
  }

  onUpdate(id: number) {
    if (this.buildingForm.valid) {
      this._buildingService.update(id, this.buildingForm.value).subscribe({
        next: (building) => {
          this.dialogRef.close();
        },
        error: (err) => console.error('Error updating building:', err)
      });
    }
  }
}

