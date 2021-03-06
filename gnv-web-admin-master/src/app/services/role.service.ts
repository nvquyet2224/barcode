import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Role } from '../models/role';
import { AuthService } from './auth.service';
import {any} from 'codelyzer/util/function';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class RoleService {

  constructor(private http: HttpClient,
              private authService: AuthService
  ) { }
  private token: string = this.authService.getCurrentUser().data.token;
  private privateUrl = 'http://api.gnv.findsoft.vn/roles/';  // URL to web api

  getAll(): Observable<Role[]> {
    const url = this.privateUrl + 'view';
    const options = {
      headers: httpOptions.headers.set( 'Authorization' , this.token)
    };
    return this.http.get<Role[]>( url, options).pipe(
      tap(role => this.log(`fetched roles`)),
      catchError(this.handleError('getAll', []))
    );
  }

  deleteRole() {

  }

  createRole (role: Role): Observable<Role> {
    const url = this.privateUrl + 'create/';
    const body = {
      name: role.name,
    };
    const headers = httpOptions.headers.set( 'Authorization' , this.token)
    const  options = {
      headers: headers
    };
    console.log(options);
    return this.http.post<Role>(url, body , options).pipe(
      tap(( role_result: Role) => this.log(`added role w/ user=${ body.name}`)),
      catchError(this.handleError<Role>('createRole'))
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
