import {Injectable} from '@angular/core';
import UrlJoin from 'url-join';
import {environment} from '@environments/environment';
import {DashboardApiUrls} from '@dashboard/dashboard-api-urls';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '@dashboard/models/apiResponse';
import {SubmissionsApiUrls} from '@app/modules/submissions/submissions-api-urls';
import {BaseService} from '@app/core/base/base-service';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService extends BaseService<ApiResponse> {

  constructor(client: HttpClient) {
    super(client, UrlJoin(environment.apiUrl, SubmissionsApiUrls.SUBMISSIONS))
  }

  getSubmissions(options: {
    page?: number;
    pageSize?: number;
    sort?: string;
    order?: string;
    filters?: { [key: string]: string | number | boolean | null };
  } = {}): Observable<ApiResponse> {
    return this.getDataPagination('', options);
  }
}
