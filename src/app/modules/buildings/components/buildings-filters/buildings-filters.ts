import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    AsyncPipe,
    CommonModule,
    MatIconModule,
    MatSliderModule,
    MatCheckboxModule
  ],
  templateUrl: './buildings-filters.html',
})
export class BuildingsFilters implements OnInit {

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

  rooms: any = [
    {name: '1', checked: false, value: 1},
    {name: '2', checked: false, value: 2},
    {name: '3', checked: false, value: 3},
    {name: '4+', checked: false, value: 4},
  ]

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  update(completed: boolean, index: number) {
    this.rooms[index].checked = completed;
  }
}
