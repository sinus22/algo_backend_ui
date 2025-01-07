import {Injectable} from '@angular/core';
import UrlJoin from 'url-join';
import {environment} from '@environments/environment'
import {DashboardApiUrls} from '@dashboard/dashboard-api-urls';
import {Observable} from 'rxjs';
import {ApiResponse} from '@dashboard/models/apiResponse';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  private apiUrl = UrlJoin(environment.apiUrl, DashboardApiUrls.CONTESTS);
  constructor(private client: HttpClient) {
  }
  getContests(page: number = 1, pageSize: number = 10, sort: string = 'id', order: string='desc'): Observable<ApiResponse> {
    const params = new HttpParams()
    .set('page', page)
    .set('pageSize', pageSize)
    .set('sort', sort)
    .set('order', order)
    ;
    return this.client.get<ApiResponse>(this.apiUrl, {params});
  }
}
