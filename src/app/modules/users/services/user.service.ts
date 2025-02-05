import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '@dashboard/models/apiResponse';
import {environment} from '@environments/environment';
import UrlJoin from 'url-join';
import {DashboardApiUrls} from '@dashboard/dashboard-api-urls';
import {UsersApiUrls} from '@app/modules/users/users-api-urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = UrlJoin(environment.apiUrl, UsersApiUrls.USERS);

  constructor(private http: HttpClient) {
  }

  getUsers(page: number = 1, pageSize: number = 10, sort: string = 'id', order: string = 'desc'): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('sort', sort)
      .set('order', order)
    ;

    return this.http.get<ApiResponse>(this.apiUrl, {
      params: params
    });
  }

  getRefreshTokens(page: number = 1, pageSize: number = 10, sort: string = 'id', order: string = 'desc'): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('sort', sort)
      .set('order', order)
    ;
    return this.http.get<ApiResponse>(UrlJoin(this.apiUrl, 'refresh-tokens'), {params});
  }

  getUniversities(page: number = 1, pageSize: number = 10, sort: string = 'id', order: string = 'desc'): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('sort', sort)
      .set('order', order)
    ;
    return this.http.get<ApiResponse>(UrlJoin(this.apiUrl, 'universities'), {params});
  }

  getFaculties(page: number = 1, pageSize: number = 10, sort: string = 'id', order: string = 'desc'): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('sort', sort)
      .set('order', order)
    ;
    return this.http.get<ApiResponse>(UrlJoin(this.apiUrl, 'faculties'), {params});
  }

}
