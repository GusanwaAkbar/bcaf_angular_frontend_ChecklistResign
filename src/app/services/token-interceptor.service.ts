// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth-service.service';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {
//     console.log('TokenInterceptor has been instantiated');
//   }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const currentUser = this.authService.currentUserValue;
    
//     console.log('TokenInterceptor intercept method called');
//     console.log('Current User:', currentUser);

//     if (currentUser && currentUser.token) {
//       console.log('Token found, cloning request with authorization header');
//       req = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${currentUser.token}`
//         }
//       });
//     } else {
//       console.log('No token found, proceeding with original request');
//     }
    
//     return next.handle(req);
//   }
// }
