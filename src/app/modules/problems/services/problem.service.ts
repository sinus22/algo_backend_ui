import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import UrlJoin from 'url-join';
import {environment} from '@environments/environment';
import {CreateProblem} from '@app/core/models/create-problem';
import {ApiResponse} from '@dashboard/models/apiResponse';
import {ProblemsApiUrls} from '@app/modules/problems/problems-api-urls';
import {BaseService} from '@app/core/base/base-service';

@Injectable({
  providedIn: 'root'
})
export class ProblemService extends BaseService<ApiResponse> {
  constructor(client: HttpClient) {
    super(client, UrlJoin(environment.apiUrl, ProblemsApiUrls.PROBLEMS))
  }

  getProblems(options: {
    page?: number;
    pageSize?: number;
    sort?: string;
    order?: string;
    filters?: { [key: string]: string | number | boolean | null };
  }): Observable<ApiResponse> {

    return this.getDataPagination('', options)
  }

  createProblem(problem: CreateProblem): Observable<any> {
    return this.postData('', problem);
  }

}
