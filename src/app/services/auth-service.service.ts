import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  getToken(): Observable<string | null> {
    return of(localStorage.getItem('token'));
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<ApiResponse<LoginResponse>>(`${environment.base_url}/api/auth/signin`, { username, password })
      .pipe(
        map(response => {
          const user = response.data; 

          console.log("check auth")
          console.log(user)

          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('token', user.token);
            this.currentUserSubject.next(user);
          }
          return user;
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const currentUser = this.currentUserValue;
    return currentUser && currentUser.token ? true : false;
  }

  getUserAuthorities(): string[] {
    const currentUser = this.currentUserValue;
    return currentUser && currentUser.authorities ? currentUser.authorities.map((auth: { authority: string }) => auth.authority) : [];
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMsg));
  }
}