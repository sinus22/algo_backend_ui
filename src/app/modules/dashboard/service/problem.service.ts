import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {PaginatedResponse} from '../models/paginationResponse';
import {Problem} from '../models/problem';
import UrlJoin from 'url-join';
import {environment} from '@environments/environment';
import {DashboardApiUrls} from '@dashboard/dashboard-api-urls';
import {CreateProblem} from '@app/core/models/create-problem';
import {ApiResponse} from '@dashboard/models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private baseUrl = UrlJoin(environment.apiUrl, DashboardApiUrls.PROBLEMS);
  constructor(private client: HttpClient) { }
  getProblems(page: number = 1, perPage: number = 10): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', perPage.toString());
    return this.client.get<ApiResponse>(this.baseUrl, {params});
  }
  createProblem(problem: CreateProblem): Observable<any> {
    return this.client.post(this.baseUrl, problem).pipe(
      catchError((error) => {
        console.error('Error creating problem:', error);
        return throwError(() => error);
      })
    );
  }

}
