import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '@app/core/services/auth.service';
import {inject} from '@angular/core';
import {catchError, switchMap, throwError} from 'rxjs';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

  }
  return next(req)
  .pipe(
    catchError((error) => {
      if (error.status === 401 && !isRefreshing) {
        isRefreshing = true;
        return authService.refreshToken().pipe(
          switchMap(() => {
            const newAccessToken = localStorage.getItem('accessToken');
            if (accessToken) {
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${accessToken}`
                }
              })
            }
            isRefreshing = false;
            // Retry the original request with the new access token
            return next(req);
          }),
          catchError((error) => {
            isRefreshing = false;
            authService.logout();
            return throwError(()=>error);
          })
        );
      }
      return throwError(()=>error);
    })
  );
};
