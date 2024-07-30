// src/app/services/resignation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Resignation, ResignationGet } from '../models/resignation.model';
import { UserDetail, UserDetailV2 } from '../models/user-detail';
import { ApiResponse, ApiResponsePage } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ResignationService {
  private apiUrl = `${environment.base_url}/api/resignations`;

  constructor(private http: HttpClient) {}

  postResignation(data: Resignation): Observable<Resignation> {
    return this.http.post<Resignation>(`${this.apiUrl}`, data);
  }

  getUserDetail(): Observable<ApiResponse<UserDetail>> {
    const url = `${this.apiUrl}/user-detail`;
    return this.http.get<ApiResponse<UserDetail>>(url);
  }


  //V2 userDetail Karyawan and Atasan
  getUserDetailV2(): Observable<ApiResponse<UserDetailV2>> {
    const url = `${this.apiUrl}/user-detail/V2`;
    return this.http.get<ApiResponse<UserDetailV2>>(url);
  }

  //Atasan ke dua
  getUserDetailAtasan2(): Observable<ApiResponse<UserDetailV2>> {
    const url = `${this.apiUrl}/user-detail-atasan2`;
    return this.http.get<ApiResponse<UserDetailV2>>(url);
  }


  //this function to get all resignations
  getResignation(): Observable<ApiResponse<Resignation>> {
    return this.http.get<ApiResponse<ResignationGet>>(this.apiUrl)
  }

  //this function to get by user
  getResignationByUser(): Observable<ApiResponse<Resignation>> {
    return this.http.get<ApiResponse<ResignationGet>>(`${environment.base_url}/api/resignations/karyawan-resign`)
  }

  getResignationByNipKaryawan(nipKaryawan: string): Observable<any> {
    return this.http.get<ApiResponse<ResignationGet>>(`${environment.base_url}/api/tracking/get-resignations/${nipKaryawan}`)
  }

  getCheckNipKaryawanResign(nipKaryawan: any): Observable<any> {

    console.log(nipKaryawan)

    return this.http.get<ApiResponse<UserDetailV2>>(`${environment.base_url}/api/resignations/admin/check-nip-karyawan/${nipKaryawan}`)
  }

  getCheckNipKaryawanResignAtasan2(nipKaryawan: any): Observable<any> {

    console.log(nipKaryawan)

    return this.http.get<ApiResponse<UserDetailV2>>(`${environment.base_url}/api/resignations/user-detail-atasan2/${nipKaryawan}`)
  }

  //url = /user-detail-atasan2/{nipKaryawan}

  getResignationListV2(
    page: number,
    size: number,
    nipKaryawanResign?: string,
    namaKaryawan?: string,
    approvalStatusAtasan?: string,
    sortBy?: string,
    sortDirection?: string
  ): Observable<ApiResponsePage<ResignationGet>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
  
    if (nipKaryawanResign) {
      params = params.set('nipKaryawanResign', nipKaryawanResign);
    }
    if (namaKaryawan) {
      params = params.set('namaKaryawan', namaKaryawan);
    }
    if (approvalStatusAtasan) {
      params = params.set('approvalStatusAtasan', approvalStatusAtasan);
    }
    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }
    if (sortDirection) {
      params = params.set('sortDirection', sortDirection);
    }
  
    return this.http.get<ApiResponsePage<ResignationGet>>(`${environment.base_url}/api/resignations/admin`, { params });
  }




 
  
}
