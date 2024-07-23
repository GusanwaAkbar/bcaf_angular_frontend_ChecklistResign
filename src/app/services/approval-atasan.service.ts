// src/app/services/approval.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApprovalAtasanGet, ApprovalAtasanPost} from '../models/approval-atasan'
import { environment } from '../../environments/environment';
import { ApiResponse, ApiResponseList, ApiResponsePage } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ApprovalAtasanService {

  private apiUrl = environment.base_url; // Ganti dengan URL API yang sesuai
  
  
  getApprovalAtasanListV2(
    page: number,
    size: number,
    nipKaryawanResign?: string,
    namaKaryawan?: string,
    approvalStatusAtasan?: string,
    sortBy?: string,
    sortDirection?: string
  ): Observable<ApiResponsePage<ApprovalAtasanGet>> {
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
  
    return this.http.get<ApiResponsePage<ApprovalAtasanGet>>(`${this.apiUrl}/api/approval-atasan/get-approval-by-username/V2`, { params });
  }
  



  constructor(private http: HttpClient) { }

  getApprovalAtasanList(): Observable<any> {
    return this.http.get<ApiResponseList<ApprovalAtasanGet>>(`${this.apiUrl}/api/approval-atasan/get-approval-by-username`);
  }

  getApprovalAtasan(): Observable<any> {
    return this.http.get<ApiResponseList<ApprovalAtasanGet>>(`${this.apiUrl}/api/approval-atasan/get-approval-by-username`);
  }

  submitApproval(id: number, data: ApprovalAtasanPost): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/approval-atasan/get-approval-by-username/${id}`, data);
  }


  getApprovalAtasanById(id: number): Observable<any> {
    return this.http.get<ApiResponse<ApprovalAtasanGet>>(`${this.apiUrl}/api/approval-atasan/${id}`);
  }

  getApprovalAtasanByKaryawan(): Observable<any>
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-atasan/karyawan-resign)`);
  }


  }


  


  


