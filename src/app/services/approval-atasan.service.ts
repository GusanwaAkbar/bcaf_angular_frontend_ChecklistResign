// src/app/services/approval.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApprovalAtasanGet, ApprovalAtasanPost} from '../models/approval-atasan'
import { environment } from '../../environments/environment';
import { ApiResponse, ApiResponseList } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ApprovalAtasanService {

  private apiUrl = environment.base_url; // Ganti dengan URL API yang sesuai

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


  


  


