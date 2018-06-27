import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../models/user';
import { AuthService } from './auth.service';
import {any} from 'codelyzer/util/function';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  constructor(private http: HttpClient,
              private authService: AuthService
              ) { }
  private token: string = this.authService.getCurrentUser().data.token;
  private privateUrl = 'http://api.gnv.findsoft.vn/users/';  // URL to web api
  getAll(): Observable<User[]> {
    const url = this.privateUrl + 'view';
    const options = {
      headers: httpOptions.headers.set( 'Authorization' , this.token)
    };
    return this.http.get<User[]>(url, options).pipe(
      tap(user => this.log(`fetched users`)),
      catchError(this.handleError('getAll', []))
    );
  }

  getUser(id: number): Observable<User> {
    const url = this.privateUrl + 'view/' + id;
    const options = {
      headers: httpOptions.headers.set( 'Authorization' , this.token)
    };
    return this.http.get<User>(url, options).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  updateUser (user: User): Observable<any> {
    const id = typeof user === 'number' ? user : user.id;
    const url = this.privateUrl + 'update/' + id;
    const body = {
      username: user.username,
      email: user.email,
      role_id: user.role_id
    };
    const headers = httpOptions.headers.set( 'Authorization' , this.token)
    const  options = {
      headers: headers
    };
    return this.http.put(url, body, options).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  createUser (user: User): Observable<User> {
    const url = this.privateUrl + 'create/';
    const body = {
        username: user.username,
        password: user.password,
        email: user.email,
        role_id: user.role_id,
        status: user.status
    };
    const headers = httpOptions.headers.set( 'Authorization' , this.token);
    const  options = {
      headers: headers
    };
    return this.http.post<User>(url, body , options).pipe(
      tap(( user_result : User) => this.log(`added user w/ user=${ body.username}`)),
      catchError(this.handleError<User>('createUser'))
    );
  }

  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = this.privateUrl + 'delete/' + id;
    const headers = httpOptions.headers.set( 'Authorization' , this.token)
    const  options = {
      headers: headers
    };
    return this.http.delete<User>( url, options).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
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
