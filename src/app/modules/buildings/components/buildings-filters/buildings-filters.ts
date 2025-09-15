import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Component, OnInit, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-buildings-filters',
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatSliderModule,
    MatCheckboxModule
  ],
  templateUrl: './buildings-filters.html',
})
export class BuildingsFilters implements OnInit {
  filterData = output<{
    city?: string;
    value_min?: number;
    value_max?: number;
    room_amount?: number[];
  }>();
  myForm: FormGroup;
  rooms: any = [
    { name: '1', checked: false, value: 1 },
    { name: '2', checked: false, value: 2 },
    { name: '3', checked: false, value: 3 },
    { name: '4+', checked: false, value: 4 },
  ]

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      ciudad: [''],
      valorSuperior: [null, [Validators.min(0)]],
      valorInferior: [null, [Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.onSubmit()
  }

  onSubmit() {
    this.emitValue()
  }

  onClear() {
    this.myForm.reset();
    this.rooms.forEach((element: { checked: boolean; }) => {
      element.checked = false;
    });
    this.emitValue();
  }


  update(completed: boolean, index: number) {
    this.rooms[index].checked = completed;
  }


  emitValue() {
    const formValue = this.myForm.value;
    let checked_rooms = this.rooms.filter((e: any) => e.checked)
    checked_rooms = checked_rooms.map((e: { value: any; })=>{return e.value});
    const data = {
      city: formValue.ciudad??undefined,
      value_min: formValue.valorInferior??undefined,
      value_max: formValue.valorSuperior??undefined,
      room_amount: checked_rooms,
    }
    this.filterData.emit(data);
  }

}
