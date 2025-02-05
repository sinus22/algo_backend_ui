import {Injectable} from '@angular/core';
import UrlJoin from 'url-join';
import {environment} from '@environments/environment'
import {Observable} from 'rxjs';
import {ApiResponse} from '@dashboard/models/apiResponse';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ContestsApiUrls} from '@app/modules/contests/contests-api-urls';
import {BaseService} from '@app/core/base/base-service';

@Injectable({
  providedIn: 'root'
})
export class ContestService extends BaseService<ApiResponse> {

  constructor(http: HttpClient) {
    super(http, UrlJoin(environment.apiUrl, ContestsApiUrls.CONTESTS))
  }

  getContests(options: {
    page?: number;
    pageSize?: number;
    sort?: string;
    order?: string;
    filters?: { [key: string]: string | number | boolean | null };
  }): Observable<ApiResponse> {
    return this.getDataPagination('', options);
  }

  getContestStandings(options: {
    page?: number;
    pageSize?: number;
    sort?: string;
    order?: string;
    filters?: { [key: string]: string | number | boolean | null };
  }): Observable<ApiResponse> {
    return this.getDataPagination('standings', options);
  }

  getContestProblems(options: {
    page?: number;
    pageSize?: number;
    sort?: string;
    order?: string;
    filters?: { [key: string]: string | number | boolean | null };
  }): Observable<ApiResponse> {
    return this.getDataPagination('problems', options);
  }

}
