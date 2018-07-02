import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Warehouse } from '../../models/_delivery/index';
import { AuthService } from '../auth.service';
import { any } from 'codelyzer/util/function';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WarehouseService {
  constructor(private http: HttpClient,
              private authService: AuthService
  ) { }
  private token: string = this.authService.getCurrentUser().data.token;
  private privateUrl = 'http://api.gnv.findsoft.vn/warehouses/';  // URL to web api
  getAll(): Observable<Warehouse[]> {
    const url = this.privateUrl + '';
    const options = {
      headers: httpOptions.headers.set( 'Authorization' , this.token)
    };
    return this.http.get<Warehouse[]>(url, options).pipe(
      tap(warehouse => this.log(`fetched warehouse`)),
      catchError(this.handleError('getAll', []))
    );
  }

  getWarehouse(id: number): Observable<Warehouse> {
    const url = this.privateUrl + 'view/' + id;
    const options = {
      headers: httpOptions.headers.set( 'Authorization' , this.token)
    };
    return this.http.get<Warehouse>(url, options).pipe(
      tap(_ => this.log(`fetched warehouse id=${id}`)),
      catchError(this.handleError<Warehouse>(`getWarehouse id=${id}`))
    );
  }

  createWarehouse(warehouse: Warehouse ): Observable<Warehouse> {
    const url = this.privateUrl + 'create/';
    const body = {
      location_id: warehouse.location_id,
      name: warehouse.name,
      mining_text: warehouse.mining_text,
      phone: warehouse.phone,
      address: warehouse.address,
      status: warehouse.status
    };
    console.log(body);
    const headers = httpOptions.headers.set( 'Authorization' , this.token);
    const  options = {
      headers: headers
    };
    return this.http.post<Warehouse>(url, body , options).pipe(
      tap(( warehouse_result: Warehouse) => this.log(`create Warehouse  w/ Warehouse=${ body.name}`)),
      catchError(this.handleError<Warehouse>('createWarehouse'))
    );
  }

  updateWarehouse (warehouse: Warehouse): Observable<any> {
    const id = typeof warehouse === 'number' ? warehouse : warehouse.id;
    const url = this.privateUrl + 'update/' + id;
    const body = {
      location_id: warehouse.location_id,
      name: warehouse.name,
      mining_text: warehouse.mining_text,
      phone: warehouse.phone,
      address: warehouse.address,
      status: warehouse.status
    };
    console.log(body);
    const headers = httpOptions.headers.set( 'Authorization' , this.token)
    const  options = {
      headers: headers
    };
    return this.http.put(url, body, options).pipe(
      tap(_ => this.log(`updated warehouse name=${body.name}`)),
      catchError(this.handleError<any>('updateWarehouse'))
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
