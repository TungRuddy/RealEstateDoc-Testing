import {
  HttpClient,
  HttpHeaders,
  HttpResponseBase,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifyService } from './notify.service';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private notifyService: NotifyService) {}

  private setHeaders(): HttpHeaders {
    var headersConfig = {
      // 'Access-Control-Expose-Headers': 'etag',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return new HttpHeaders(headersConfig);
  }
  private handleError(error: HttpResponseBase | any) {
    if (error?.error?.error && typeof error.error.error === 'string') {
      this.notifyError(error.error.error);
    } else {
      this.notifyError();
    }
    throw error;
  }
  notifyError(errormessage?: string) {
    this.notifyService.sendData(
      errormessage ? errormessage : 'Something went wrong!'
    );
  }

  get(path: string, params = {}): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, {
        headers: this.setHeaders(),
        params: params,
      })
      .pipe(
        map((res) => res),
        catchError((error: any): any => this.handleError(error))
      );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(
        map((res) => res),
        catchError((error: any): any => this.handleError(error))
      );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(
        map((res) => res),
        catchError((error: any): any => this.handleError(error))
      );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`, {
      headers: this.setHeaders(),
      observe: 'response', /// return status api response
    });
  }
}
