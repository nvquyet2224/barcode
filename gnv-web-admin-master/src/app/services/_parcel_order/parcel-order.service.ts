import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { ParcelOrder } from '../../models/_parcel_order/index';
import { AuthService } from '../auth.service';
import { any } from 'codelyzer/util/function';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ParcelOrderService {
  private token: string = this.authService.getCurrentUser().data.token;
  private privateUrl = 'http://api.gnv.findsoft.vn/orders/';  // URL to web api
  constructor(private http: HttpClient,
              private authService: AuthService
  ) { }
  getGroup () {
    const arrGroup: any = [
      {
        id: '0',
        text: 'Not use group by datetime'
      },
      {
        id: '1',
        text: 'Group by created datetime'
      },
      {
        id: '2',
        text: 'Group by expected pickup datetime.'
      },
      {
        id: '3',
        text: 'Group by expected delivery datetime'
      }
    ];
    return arrGroup;
  }
  getNote () {
    const arrNote: any = [
      {
        id: '0',
        text: 'Chọn ghi chú'
      },
      {
        id: '1',
        text: 'Cho xem hàng, không cho thử'
      },
      {
        id: '2',
        text: 'Cho thử hàng'
      },
      {
        id: '3',
        text: 'Không cho xem hàng'
      }
    ];
    return arrNote;
  }
  getType () {
    const arrType: any = [
      {
        id: '0',
        text: 'Chọn loại sản phẩm'
      },
      {
        id: 'mỹ phẩm',
        text: 'mỹ phẩm'
      },
      {
        id: 'đồ',
        text: 'đồ'
      },
      {
        id: 'mặt nạ',
        text: 'mặt nạ'
      },
      {
        id: 'thuốc',
        text: 'thuốc'
      },
      {
        id: 'Giày',
        text: 'Giày'
      },
      {
        id: 'son',
        text: 'son'
      },
      {
        id: 'Hình ảnh',
        text: 'Hình ảnh'
      },
      {
        id: 'Trà',
        text: 'Trà'
      },
      {
        id: 'quần áo',
        text: 'quần áo'
      },
      {
        id: 'case điện thoại',
        text: 'case điện thoại'
      },
      {
        id: 'card ảnh',
        text: 'card ảnh'
      },
      {
        id: 'Ốp Đt',
        text: 'Ốp Đt'
      },
      {
        id: 'Mắt Kính',
        text: 'Mắt Kính'
      }
    ];
    return arrType;
  }

  createParcelOrder(parcelorder: ParcelOrder ): Observable<ParcelOrder> {
    const url = this.privateUrl;
    let _is_cod: number;
    if (parcelorder.cod > 0) {
       _is_cod = 1;
    } else {
      _is_cod = 0;
    }
    const body = {
      'sender_info': parcelorder.sender,
      'receiver_info': parcelorder.receiver,
      'parcel_info': {
        'type': parcelorder.type,
        'size': parcelorder.size,
        'weight': parcelorder.weight,
        'value': parcelorder.value,
        'handle_instruction': parcelorder.handle_instructions,
        'expected_pickup_from': parcelorder.expected_pickup_from,
        'expected_pickup_to': parcelorder.expected_pickup_to,
        'expected_delivery_from': parcelorder.expected_delivery_from,
        'expected_delivery_to': parcelorder.expected_delivery_to
      },
      'payment_info': {
        'parcel_price': parcelorder.parcel_price,
        'service_id': parcelorder.service_id,
        'coupon_code': parcelorder.coupon_code,
        'fee_payer': parcelorder.fee_payer,
        'is_cod': _is_cod,
        'bank_cash': 10000
      }
    };
    console.log(body);
    const headers = httpOptions.headers.set( 'Authorization' , this.token);
    const  options = {
      headers: headers
    };
    return this.http.post<ParcelOrder>(url, body , options).pipe(
      tap(( warehouse_result: ParcelOrder) => this.log(`create Parcel Order`)),
      catchError(this.handleError<ParcelOrder>('createParcelOrder'))
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
