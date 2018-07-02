import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { WarehouseDetail } from '../../models/_delivery/index';
import { AuthService } from '../auth.service';
import { any } from 'codelyzer/util/function';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WarehouseDetailService {
  constructor(private http: HttpClient,
              private authService: AuthService
  ) { }
  private token: string = this.authService.getCurrentUser().data.token;
  private privateUrl = 'http://api.gnv.findsoft.vn/warehouses/details/';  // URL to web api

  createWarehouseDetail( warehousedetail: WarehouseDetail ): Observable<WarehouseDetail> {
    const url = this.privateUrl;
    const body = {
      warehouse_id: warehousedetail.warehouse_id,
      rack: warehousedetail.rack,
      bay: warehousedetail.bay,
      level: warehousedetail.level,
      position: warehousedetail.position,
      description: warehousedetail.description,
      status: warehousedetail.status
    };
    console.log(body);
    const headers = httpOptions.headers.set( 'Authorization' , this.token);
    const  options = {
      headers: headers
    };
    return this.http.post<WarehouseDetail>(url, body , options).pipe(
      tap(( warehouse_result: WarehouseDetail) =>
        this.log(`create Warehouse  w/ Warehouse= ${ body.rack + '-' + body.bay + '-' + body.level + '-' + body.position}`)),
      catchError(this.handleError<WarehouseDetail>('createWarehouse'))
    )
  }

  getWarehouseDetail(id: number): Observable<WarehouseDetail> {
    const url = this.privateUrl + id;
    const options = {
      headers: httpOptions.headers.set( 'Authorization' , this.token)
    };
    return this.http.get<WarehouseDetail>(url, options).pipe(
      tap(_ => this.log(`fetched warehouse id=${id}`)),
      catchError(this.handleError<WarehouseDetail>(`getWarehouseDetail id=${id}`))
    );
  }

  updateWarehouseDetail (warehousedetail: WarehouseDetail): Observable<any> {
    const id = typeof warehousedetail === 'number' ? warehousedetail : warehousedetail.id;
    console.log(id);
    const url = this.privateUrl + 'update/' + id;
    const body = {
      warehouse_id: warehousedetail.warehouse_id,
      rack: warehousedetail.rack,
      bay: warehousedetail.bay,
      level: warehousedetail.level,
      position: warehousedetail.position,
      description: warehousedetail.description,
      status: warehousedetail.status
    };
    console.log(body);
    const headers = httpOptions.headers.set( 'Authorization' , this.token)
    const  options = {
      headers: headers
    };
    return this.http.put(url, body, options).pipe(
      tap(_ => this.log(`updated warehouse name=${body.rack + '-' + body.bay + '-' + body.level + '-' + body.position}`)),
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
