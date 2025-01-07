import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaginatedResponse} from '../models/paginationResponse';
import {Problem} from '../models/problem';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private apiUrl = 'http://localhost:5105/Problem';
  constructor(private client: HttpClient) { }
  getProblems(page: number = 1, perPage: number = 10): Observable<PaginatedResponse<Problem>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
    return this.client.get<any>(this.apiUrl, {params});
  }
}
