import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response'; 
import { UserDetail } from '../models/user-detail';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  private apiUrl = 'api/resignations/user-detail';
  private bearerToken = 'Bearer ' + localStorage.getItem('token');

  constructor(private http: HttpClient) {}


  getUserDetail(): Observable<ApiResponse<UserDetail>> {
    return this.http.get<ApiResponse<UserDetail>>(this.apiUrl);
  }
  
}
