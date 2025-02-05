import {Injectable} from '@angular/core';
import UrlJoin from 'url-join';
import {environment} from '@environments/environment'
import {Observable} from 'rxjs';
import {ApiResponse} from '@dashboard/models/apiResponse';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ContestsApiUrls} from '@app/modules/contests/contests-api-urls';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  private apiUrl = UrlJoin(environment.apiUrl, ContestsApiUrls.CONTESTS);

  constructor(private client: HttpClient) {
  }

  getContests(page: number = 1, pageSize: number = 20, sort: string = 'id', order: string = 'desc'): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('sort', sort)
      .set('order', order)
    ;
    return this.client.get<ApiResponse>(this.apiUrl, {params});
  }

  getContestStandings(page: number = 1, pageSize: number = 20, sort: string = 'id', order: string = 'desc'): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('sort', sort)
      .set('order', order)
    ;
    return this.client.get<ApiResponse>(UrlJoin(this.apiUrl, 'standings'), {params});
  }
  getContestProblems(page: number = 1, pageSize: number = 20, sort: string = 'id', order: string = 'desc'): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('sort', sort)
      .set('order', order)
    ;
    return this.client.get<ApiResponse>(UrlJoin(this.apiUrl, 'problems'), {params});
  }

}
