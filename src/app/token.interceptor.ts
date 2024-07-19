import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from './services/auth-service.service';
import { LoadingService } from './services/loading.service';
import { Router } from '@angular/router';

export const TokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loadingService = inject(LoadingService);

  // Start loading
  loadingService.setLoading(true);

  // Exclude login request from interception
  if (req.url.endsWith('/api/auth/signin')) {
    return next(req).pipe(
      finalize(() => loadingService.setLoading(false))
    );
  }

  return authService.getToken().pipe(
    switchMap(token => {
      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(authReq);
      } else {
        // If no token, proceed with the original request
        return next(req);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        // Handle unauthorized or forbidden
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
    finalize(() => loadingService.setLoading(false))
  );
};