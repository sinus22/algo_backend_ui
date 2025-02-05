import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, filter, Observable, throwError} from 'rxjs';
import {ApiResponse} from '@dashboard/models/apiResponse';
import UrlJoin from 'url-join';

export abstract class BaseService<T> {
  protected constructor(private http: HttpClient, private baseUrl: string) {
  }


  private createParams(options: { [key: string]: string | number | boolean | null } = {}): HttpParams {
    let params = new HttpParams();

    Object.entries(options).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params = params.set(key, value.toString());
      }
    });

    return params;
  }

  private createParamsPagination(options: {
    page?: number;
    pageSize?: number;
    sort?: string;
    order?: string;
    filters?: { [key: string]: string | number | boolean | null };
  } = {}): HttpParams {

    let params = new HttpParams()
      .set('page', options.page?.toString() || '1')
      .set('pageSize', options.pageSize?.toString() || '10')
      .set('sort', options.sort || 'id')
      .set('order', options.order || 'desc');

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          params = params.set(key, value.toString());
        }
      });
    }

    return params;
  }

  protected getData(endpoint: string, options: {
    [key: string]: string | number | boolean | null
  } = {}): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(UrlJoin(this.baseUrl, endpoint), {
      params: this.createParams(options)
    });
  }

  protected getDataPagination(endpoint: string, options: {
    page?: number;
    pageSize?: number;
    sort?: string;
    order?: string;
    filters?: { [key: string]: string | number | boolean | null };
  } = {}): Observable<ApiResponse> {

    return this.http.get<ApiResponse>(UrlJoin(this.baseUrl, endpoint), {
      params: this.createParamsPagination(options)
    });
  }

  protected postData(endpoint: string, body: object): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(UrlJoin(this.baseUrl, endpoint), body).pipe(
      catchError((error) => {
        console.error('Error creating problem:', error);
        return throwError(() => error);
      })
    );
  }
}
