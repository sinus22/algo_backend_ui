import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import UrlJoin from 'url-join';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = UrlJoin(environment.apiUrl, "api/auth")

  constructor(private readonly http: HttpClient, private readonly _router: Router) {

  }

  signIn(data: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, data);
  }

  signUp(data: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem("refreshToken");

    return this.http.post<any>(`${this.baseUrl}/refresh`, {refreshToken: refreshToken}).pipe(
      tap((response) => {
        localStorage.clear();
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
      }),
      catchError((error) => {
        console.error('Error refreshing access token:', error);
        localStorage.clear();
        this._router.navigate(['/auth/sign-in'])
        return throwError(error);
      })
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this._router.navigate(['/auth/sign-in']);
  }

  isLogin(): boolean {
    return localStorage.getItem('accessToken') !== null;

  }
}
