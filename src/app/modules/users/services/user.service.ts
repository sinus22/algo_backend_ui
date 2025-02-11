import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ApiResponse} from '@dashboard/models/apiResponse';
import {environment} from '@environments/environment';
import UrlJoin from 'url-join';
import {DashboardApiUrls} from '@dashboard/dashboard-api-urls';
import {UsersApiUrls} from '@app/modules/users/users-api-urls';
import {BaseService} from '@app/core/base/base-service';
import {UniversityCreate} from '@app/modules/users/models/university-create.model';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {User} from '@app/modules/users/models/user';
import {Pagination} from '@app/core/base/pagination';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<ApiResponse> {


  constructor(http: HttpClient) {
    super(http, UrlJoin(environment.apiUrl, UsersApiUrls.USERS))
  }


  getUsers(options: {
    page?: number;
    pageSize?: number;
    sort?: string;
    order?: string;
    filters?: { [key: string]: string | number | boolean | null };
  } = {}): Observable<{users: User[], pagination: Pagination}> {
    return this.getDataPagination('', options).pipe(map((response: ApiResponse) => {
      if (response.success){
        const paginated = response.data as PaginatedResponse<User>;
        return {
          users: paginated.items,
          pagination: {
            totalItems: paginated.totalItems,
            totalPages: paginated.totalPages,
            page: paginated.page,
            pageSize: paginated.pageSize,
            hasPreviousPage: paginated.hasPreviousPage,
            hasNextPage: paginated.hasNextPage,
          },
        };
      }
      return { users: [], pagination: this.defaultPagination() };
    }));
  }

  getRefreshTokens(options: {
    page?: number;
    pageSize?: number;
    sort?: string;
    order?: string;
    filters?: { [key: string]: string | number | boolean | null };
  } = {}): Observable<ApiResponse> {
    return this.getDataPagination('refresh-tokens', options);
  }

  getUniversities(options: {
    page?: number;
    pageSize?: number;
    sort?: string;
    order?: string;
    filters?: { [key: string]: string | number | boolean | null };
  } = {}): Observable<ApiResponse> {
    return this.getDataPagination('universities', options);
  }

  getFaculties(options: {
    page?: number;
    pageSize?: number;
    sort?: string;
    order?: string;
    filters?: { [key: string]: string | number | boolean | null };
  } = {}): Observable<ApiResponse> {
    return this.getDataPagination('faculties', options);
  }

  createUniversity(body: UniversityCreate): Observable<ApiResponse> {
    return this.postData('universities', body);
  }
}
