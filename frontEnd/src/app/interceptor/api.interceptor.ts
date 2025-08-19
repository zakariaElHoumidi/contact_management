import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { routes_paths } from '../app.routes_paths';

export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getTokenFromLocalS();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error) => {
      const { status } = error;
      if (status === 401) {
        authService.removeTokenFromLocalS();
        authService.removeUserFromLocalS();
        router.navigate([`/${routes_paths.auth.root}/${routes_paths.auth.children.login}`])
      }

      return throwError(error);
    })
  );
};
