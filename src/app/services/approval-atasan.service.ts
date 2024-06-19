// src/app/services/approval.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApprovalAtasanGet, ApprovalAtasanPost} from '../models/approval-atasan'
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ApprovalAtasanService {

  private apiUrl = environment.base_url; // Ganti dengan URL API yang sesuai

  constructor(private http: HttpClient) { }

  getApprovalAtasanState(): Observable<any> {
    return this.http.get<ApiResponse<ApprovalAtasanGet>>(`${this.apiUrl}/api/approval-atasan/4`);
  }

  submitApproval(data: ApprovalAtasanPost): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/approval-atasan`, data);
  }
}
