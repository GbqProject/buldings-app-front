import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

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

  constructor(private fb: FormBuilder) {
    this.buildingForm = this.fb.group({
      city: ['', Validators.required],
      room_amount: [null, Validators.required],
      bathroom_amount: [null, Validators.required],
      type_consignation: ['lease', Validators.required],
      rental_value: [null],
      sale_value: [null],
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
    console.log(this.buildingForm.value);
  }
}

