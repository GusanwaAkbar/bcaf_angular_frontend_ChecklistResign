import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from './services/auth-service.service';
import { Router } from '@angular/router';

export const TokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router

  const authToken = localStorage.getItem('token');

    // Exclude login request from interception
    if (req.url.endsWith('/api/auth/signin')) {
      return next(req);
    }

  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          authService.logout(); // Handle logout
          router.navigate(['/login']); // Redirect to login page
        }
        return throwError(error);
      })
    );
  } else {
    // Optionally, you can redirect to login page or show a message
    // authService.logout(); // Handle logout or redirection
    return throwError({ status: 401, message: 'Authentication token is missing' });
  }
};
