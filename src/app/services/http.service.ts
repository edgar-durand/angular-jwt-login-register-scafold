import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(public http: HttpClient) {}

  get<returnType>(url: string, params?: HttpParams): Observable<returnType | null> {
    return this.http
      .get<returnType>(url, { params, observe: 'response' })
      .pipe(
        map((res) => res.body));
  }

  getWithPagination<returnType>(
    url: string,
    params?: HttpParams,
  ): Observable<{
    totalCount: number,
    entities: returnType[]
  }> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/text; charset=utf-8');
    return this.http
      .get<returnType[]>(url, { params, observe: 'response', headers })
      .pipe(
        map((res) => {
          const countHeader = res.headers.get('X-Total-Count')
          const totalCount = countHeader ? parseInt(countHeader) : 0;
          const entities = res.body || [];
          return {
            totalCount,
            entities,
          };
        }),
      );
  }

  post<returnType>(url: string, payload: any): Observable<returnType | null> {
    return this.http
      .post<returnType>(url, payload, { observe: 'response' })
      .pipe(map((res) => res.body));
  }

  put<returnType>(url: string, payload: unknown): Observable<returnType | null> {
    return this.http
      .put<returnType>(url, payload, { observe: 'response' })
      .pipe(map((res) => res.body));
  }

  delete<returnType>(url: string): Observable<returnType | null> {
    return this.http
      .delete<returnType>(url, { observe: 'response' })
      .pipe(map((res) => res.body));
  }
}
