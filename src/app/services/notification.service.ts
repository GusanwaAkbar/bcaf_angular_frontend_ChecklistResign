import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = environment.base_url;

  constructor(private http: HttpClient) { }

  getNotification(): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/api/notification`).pipe(
      map(response => response.data.map((item: any) => item.message))
    );
  }
}
