import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaginatedResponse} from '../models/paginationResponse';
import {Problem} from '../models/problem';
import UrlJoin from 'url-join';
import {environment} from '@environments/environment';
import {DashboardApiUrls} from '@dashboard/dashboard-api-urls';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private baseUrl = UrlJoin(environment.apiUrl, DashboardApiUrls.PROBLEMS);
  constructor(private client: HttpClient) { }
  getProblems(page: number = 1, perPage: number = 10): Observable<PaginatedResponse<Problem>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', perPage.toString());
    return this.client.get<any>(this.baseUrl, {params});
  }
}
