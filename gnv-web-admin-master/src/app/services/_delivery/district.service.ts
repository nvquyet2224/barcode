import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Districts } from '../../models/_delivery/index';
import { AuthService } from '../auth.service';
import { any } from 'codelyzer/util/function';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DistrictService {
  private token: string = this.authService.getCurrentUser().data.token;
  private privateUrl = 'http://api.gnv.findsoft.vn/configs/locations/districts/';
  constructor(private http: HttpClient,
              private authService: AuthService
  ) { }
  getAll(): Observable<Districts[]> {
    const url = this.privateUrl;
    const options = {
      headers: httpOptions.headers.set( 'Authorization' , this.token)
    };
    return this.http.get<Districts[]>(url, options).pipe(
      tap(areatype => this.log(`fetched Districts`)),
      catchError(this.handleError('getAll', []))
    );
  }
  create( district: Districts ): Observable<Districts> {
    const url = this.privateUrl + 'create/';
    const body = {
      name: district.name,
      mining_text: district.mining_text,
      province_id: district.province_id
    };
    const headers = httpOptions.headers.set( 'Authorization' , this.token);
    const  options = {
      headers: headers
    };
    return this.http.post<Districts>(url, body , options).pipe(
      tap(( warehouse_result: Districts) =>
        this.log(`create success`)),
      catchError(this.handleError<Districts>('create'))
    )
  }

  getDetail(id: number): Observable<Districts> {
    const url = this.privateUrl  + id;
    const options = {
      headers: httpOptions.headers.set( 'Authorization' , this.token)
    };
    return this.http.get<Districts>(url, options).pipe(
      tap(_ => this.log(`get detail success`)),
      catchError(this.handleError<Districts>(`getDetail`))
    );
  }

  update (district: Districts): Observable<any> {
    const id = typeof district === 'number' ? district : district.id;
    const url = this.privateUrl + 'update/' + id;
    const body = {
      name: district.name,
      mining_text: district.mining_text,
      province_id: district.province_id
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
