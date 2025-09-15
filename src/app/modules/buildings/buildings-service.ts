import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';

export interface Building {
  id?: number;
  city: string;
  room_amount: number;
  bathroom_amount: number;
  type_consignement: 'sale' | 'rent';
  rental_value?: number | null;
  sale_value?: number | null;
  images_base_64?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private apiUrl = environment.back_url+'buildings';

  constructor(private http: HttpClient) {}

  /**
   * Create a new building
   */
  create(building: Building): Observable<Building> {
    return this.http.post<Building>(this.apiUrl, building);
  }

  get(): Observable<Building> {
    return this.http.get<Building>(this.apiUrl);
  }

  /**
   * Update an existing building
   */
  update(id: number, building: Partial<Building>): Observable<Building> {
    return this.http.put<Building>(`${this.apiUrl}/${id}`, building);
  }

  /**
   * Get buildings with optional filters
   */
  getBuildings(filters?: {
    city?: string;
    value_min?: number;
    value_max?: number;
    room_amount?: number[];
  }): Observable<Building[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.city) {
        params = params.set('city', filters.city);
      }
      if (filters.value_min !== undefined) {
        params = params.set('value_min', filters.value_min);
      }
      if (filters.value_max !== undefined) {
        params = params.set('value_max', filters.value_max);
      }
      if (filters.room_amount?.length) {
        filters.room_amount.forEach(r => {
          params = params.append('room_amount[]', r);
        });
      }
    }

    return this.http.get<Building[]>(this.apiUrl+'/filter', { params });
  }

  deleteBuilding(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
