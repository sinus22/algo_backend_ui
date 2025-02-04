import { Injectable } from '@angular/core';
import UrlJoin from 'url-join';
import {environment} from '@environments/environment';
import {DashboardApiUrls} from '@dashboard/dashboard-api-urls';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {ApiResponse} from '@dashboard/models/apiResponse';
import {CreateProblem} from '@app/core/models/create-problem';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  private baseUrl = UrlJoin(environment.apiUrl, DashboardApiUrls.PROBLEMS);
  constructor(private client: HttpClient) { }
  getLang(page: number = 1, perPage: number = 10): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', perPage.toString());
    return this.client.get<ApiResponse>(this.baseUrl, {params});
  }
  createLang(problem: CreateProblem): Observable<any> {
    return this.client.post(this.baseUrl, problem).pipe(
      catchError((error) => {
        console.error('Error creating problem:', error);
        return throwError(() => error);
      })
    );
  }
}
