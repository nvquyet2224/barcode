import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Photo } from '../models/photo';
import { AuthService } from './auth.service';
import {any} from 'codelyzer/util/function';


const httpOptions = {
  headers: new HttpHeaders()
};

@Injectable()
export class FormdataUploadService {
  constructor(private http: HttpClient,
              private authService: AuthService
  ) { }
  private token: string = this.authService.getCurrentUser().data.token;
  private privateUrl = 'http://api.gnv.findsoft.vn/users/';  // URL to web api

  formdataUpload (data): Observable<Photo> {
    const url = 'http://api.gnv.findsoft.vn/users/avatars';
    const headers = httpOptions.headers.set( 'Authorization' , this.token);
    const  options = {
      headers: headers
    };
    const body = data;

    return this.http.post<Photo>(url, body, options).pipe(
      tap(_ => this.log(`updated photo `)),
      catchError(this.handleError<any>('formdataUpload'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(message);
  }
}
