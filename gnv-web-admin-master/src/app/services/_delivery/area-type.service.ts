import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { AreaType } from '../../models/_delivery/index';
import { AuthService } from '../auth.service';
import { any } from 'codelyzer/util/function';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AreaTypeService {
  private token: string = this.authService.getCurrentUser().data.token;
  private privateUrl = 'http://api.gnv.findsoft.vn/configs/locations/areaTypes/';  // URL to web api
  constructor(private http: HttpClient,
              private authService: AuthService
  ) { }

  getAll(): Observable<AreaType[]> {
    const url = this.privateUrl ;
    const options = {
      headers: httpOptions.headers.set( 'Authorization' , this.token)
    };
    console.log(url);
    return this.http.get<AreaType[]>(url, options).pipe(
      tap(areatype => this.log(`fetched AreaType`)),
      catchError(this.handleError('getAll', []))
    );
  }
  create( areaType: AreaType ): Observable<AreaType> {
    const url = this.privateUrl + 'create/';
    const body = {
      name: areaType.name,
      price: areaType.price
    };
    const headers = httpOptions.headers.set( 'Authorization' , this.token);
    const  options = {
      headers: headers
    };
    return this.http.post<AreaType>(url, body , options).pipe(
      tap(( warehouse_result: AreaType) =>
        this.log(`create success`)),
      catchError(this.handleError<AreaType>('create'))
    )
  }

  getDetail(id: number): Observable<AreaType> {
    const url = this.privateUrl + id;
    const options = {
      headers: httpOptions.headers.set( 'Authorization' , this.token)
    };
    return this.http.get<AreaType>(url, options).pipe(
      tap(_ => this.log(`get detail success`)),
      catchError(this.handleError<AreaType>(`getDetail`))
    );
  }

  update (areaType: AreaType): Observable<any> {
    const id = typeof areaType === 'number' ? areaType : areaType.id;
    const url = this.privateUrl + 'update/' + id;
    const body = {
      name: areaType.name,
      price: areaType.price
    };
    const headers = httpOptions.headers.set( 'Authorization' , this.token)
    const  options = {
      headers: headers
    };
    return this.http.put(url, body, options).pipe(
      tap(_ => this.log(`updated success`)),
      catchError(this.handleError<any>('update'))
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
