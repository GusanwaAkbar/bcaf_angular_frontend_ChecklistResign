// src/app/services/resignation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Resignation, ResignationGet } from '../models/resignation.model';
import { UserDetail } from '../models/user-detail';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ResignationService {
  private apiUrl = `${environment.base_url}/api/resignations`;

  constructor(private http: HttpClient) {}

  postResignation(data: Resignation): Observable<Resignation> {
    return this.http.post<Resignation>(this.apiUrl, data);
  }

  getUserDetail(): Observable<ApiResponse<UserDetail>> {
    const url = `${this.apiUrl}/user-detail`;
    return this.http.get<ApiResponse<UserDetail>>(url);
  }


  //this function to get all resignations
  getResignation(): Observable<ApiResponse<Resignation>> {
    return this.http.get<ApiResponse<ResignationGet>>(this.apiUrl)
  }

  //this function to get by user
  getResignationByUser(): Observable<ApiResponse<Resignation>> {
    return this.http.get<ApiResponse<ResignationGet>>(`${environment.base_url}/api/resignations/karyawan-resign`)
  }



 
  
}
