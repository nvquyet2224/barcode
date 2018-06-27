import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { SupportType } from '../../models/_delivery/index';
import { AuthService } from '../auth.service';
import { any } from 'codelyzer/util/function';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SupportTypeService {
  constructor(private http: HttpClient,
              private authService: AuthService
  ) { }
  private token: string = this.authService.getCurrentUser().data.token;
  private privateUrl = 'http://api.gnv.findsoft.vn/warehouses/';  // URL to web api

  getAll(): Observable<SupportType[]> {
    const url = this.privateUrl + 'view';
    const options = {
      headers: httpOptions.headers.set( 'Authorization' , this.token)
    };
    return this.http.get<SupportType[]>(url, options).pipe(
      tap(areatype => this.log(`fetched SupportType`)),
      catchError(this.handleError('getAll', []))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(message);
  }
}
