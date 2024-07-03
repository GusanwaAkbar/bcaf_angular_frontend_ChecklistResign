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
export class AdminService {

  private apiUrl = environment.base_url; // Ganti dengan URL API yang sesuai

  constructor(private http: HttpClient) { }

  postChangeRole(data: object): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/auth/changeRole`, data);
  }

  //get Admin of user
  // /api/admin/non-user-authorities

  getUsersAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/admin/non-user-authorities`);
  }

    //this function to get all resignations
    getResignationAdmin(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/api/resignations`)
    }

  }


  


  


