import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '@app/core/services/auth.service';
import {inject} from '@angular/core';
import {BehaviorSubject, catchError, filter, switchMap, take, throwError} from 'rxjs';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);
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
    return next(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          if (!isRefreshing) {
            isRefreshing = true;
            refreshTokenSubject.next(null);

            return authService.refreshToken().pipe(
              switchMap((response) => {
                isRefreshing = false;
                refreshTokenSubject.next(response.accessToken);

                req = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.accessToken}`,
                  },
                });
                return next(req);
              }),
              catchError((error) => {
                isRefreshing = false;
                authService.logout();
                return throwError(() => error);
              })
            );
          } else {
            // Parallel so‘rovlarni kutish
            return refreshTokenSubject.pipe(
              filter((token) => token !== null),
              take(1),
              switchMap((token) => {
                req = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                return next(req);
              })
            );
          }
        }

        return throwError(() => error);
      })
    );

};
