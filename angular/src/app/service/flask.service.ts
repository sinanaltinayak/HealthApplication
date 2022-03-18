import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlaskService {

  API_URL = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient) { }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(() => new Error(err))
  }
  getResult() {
    return this.http.get(this.API_URL+'/api/getResult');
  }
}
