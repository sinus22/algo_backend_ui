import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '@dashboard/models/apiResponse';
import {environment} from '@environments/environment';
import UrlJoin from 'url-join';
import {DashboardApiUrls} from '@dashboard/dashboard-api-urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = UrlJoin(environment.apiUrl, DashboardApiUrls.USERS);

  constructor(private http: HttpClient) {
  }

  getUsers(page: number = 1, pageSize: number = 10, sort: string = 'id', order: string = 'desc'): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('sort', sort)
      .set('order', order)
    ;
    const accessToken=localStorage.getItem('accessToken');
    const headers=new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + accessToken);
    ;
    return this.http.get<ApiResponse>(this.apiUrl, {params: params
      // headers: headers,
      // withCredentials: true
    });
  }
}
