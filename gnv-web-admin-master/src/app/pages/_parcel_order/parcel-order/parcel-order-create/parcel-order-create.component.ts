import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';
import { any } from 'codelyzer/util/function';

import { Locate } from '../../../../models/_delivery/locate';
import { Warehouse } from '../../../../models/_delivery/index';
import { ParcelOrder } from '../../../../models/_parcel_order/index'
import { LocationService, WarehouseService, DeliveryService } from '../../../../services/_delivery/index';
import { ParcelOrderService } from '../../../../services/_parcel_order/index';
import { MessageService } from '../../../../services/message.service';
import { Subscription } from 'rxjs/Subscription';

interface ParcelOrderFace {
  id: number;
  warehouse_id: number;
  order_status_id: number;
  owner_id: number;
  shipper_id: number;
  receiver: any;
  sender: any;
  dataType: string;
  size: any;
  weight: number;
  value: number;
  handle_instructions: string;
  source_location_id: number;
  dest_location_id: number;
  coupon_code: string;
  service_id: number;
  expected_pickup_from: any;
  expected_pickup_to: any;
  expected_delivery_from: any;
  expected_delivery_to: any;
  is_cod: number;
  cod: number;
  fee_payer: number;
  bank_cash: number;
  route: string;
  last_location: string;
  current_location: string;
  money_remain: number;
  pickup_date: any;
  delivery_date: any;
  delivery_fee: number;
  parcel_price: number;
}


interface DataItem {
  id: number;
  content: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-parcel-order-create',
  templateUrl: './parcel-order-create.component.html',
  styleUrls: ['./parcel-order-create.component.scss']
})
export class ParcelOrderCreateComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  public receiver2Data: Array<Select2OptionData>;
  public send2Data: Array<Select2OptionData>;
  public delivery2Data: Array<Select2OptionData>;
  public note2Data: Array<Select2OptionData>;
  public type2Data: Array<Select2OptionData>;
  public selectedSend: string;
  public selectedReceiver: string;
  public selectedDelivery: string;
  public selectedNote: string;
  public selectedType: string;
  private token: string = this.authService.getCurrentUser().data.token;
  message: any;
  subscription: Subscription;
  locations: Locate[] = [];
  dataitem: DataItem[] = [];
  warehouses: Warehouse[] = [];
  parcelsorders: ParcelOrder[] = [];
  parceorderface: ParcelOrderFace[] = [];
  isChecked: boolean;
  feeMoney: number;
  constructor(private http: HttpClient,
              private authService: AuthService,
              private locationService: LocationService,
              private warehouseService: WarehouseService,
              private deliveryService: DeliveryService,
              private parcelorderService: ParcelOrderService,
              private messageService: MessageService ) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
  }

  ngOnInit() {
    this.note2Data = this.parcelorderService.getNote();
    this.type2Data = this.parcelorderService.getType();
    this.feeMoney = 0;
    this.loadInit();
  }
  loadInit() {
    let response: any;
    let item: any;
    let strLocation: string;
    let arrDataReceiver = [];
    let arrDataSend = [];
    let arrDelivery = [];
    let dataLocation: any;
    let dataDelivery: any;
    let n: number = 0;
    let m: number = 0;
    this.locationService.getAll()
      .subscribe( result => {
          response = result;
          console.log(response);
          if (response.data.locations.length > 0) {
            dataLocation = response.data.locations;
            for ( let i = 0; i < dataLocation.length; i++) {
              if ( dataLocation[i].SupportTypes.id == 1 ||  dataLocation[i].SupportTypes.id == 3 ) {
                strLocation =  dataLocation[i].Districts.name + ' - ' + dataLocation[i].Provinces.name + ' - ' +
                   dataLocation[i].AreaTypes.name ;
                item = {
                  id: dataLocation[i].id,
                  text: strLocation
                };
                arrDataSend.push(item);
              } else if ( dataLocation[i].SupportTypes.id == 2 ||  dataLocation[i].SupportTypes.id == 3 ){
                strLocation =  dataLocation[i].Districts.name + ' - ' + dataLocation[i].Provinces.name + ' - ' +
                  dataLocation[i].AreaTypes.name ;
                item = {
                  id: dataLocation[i].id,
                  text: strLocation
                };
                arrDataReceiver.push(item);
              }
            }
            this.isChecked = true;
            this.receiver2Data = arrDataReceiver;
            this.send2Data = arrDataSend;
          }
        },
        err => {
          // console.log(arrData);
        }
      );
    this.deliveryService.getAll()
      .subscribe( result => {
          response = result;
          if (response.data.services.length > 0) {
            dataDelivery = response.data.services;
            for ( let i = 0; i < dataDelivery.length; i++) {
              strLocation =  dataDelivery[i].name + ' - ' + dataDelivery[i].price + ' VND' ;
              item = {
                id: dataDelivery[i].id,
                text: strLocation
              };
              arrDelivery.push(item);
            }
            this.isChecked = true;
            this.delivery2Data = arrDelivery;
            console.log( this.delivery2Data);
          }
        },
        err => {
          console.log(arrDelivery);
        }
      );
  }
  onSubmit() {

    const nameSend = this.registerForm.controls.nameSend.value;
    const phoneSend =  this.registerForm.controls.phoneSend.value;
    const addressSend =  this.registerForm.controls.addressSend.value;
    const locaSend =  this.registerForm.controls.locaSend.value;
    const nameReceiver = this.registerForm.controls.nameReceiver.value;
    const phoneReceiver =  this.registerForm.controls.phoneReceiver.value;
    const addressReceiver =  this.registerForm.controls.addressReceiver.value;
    const locaReceiver =  this.registerForm.controls.locaReceiver.value;
    const type = this.registerForm.controls.dataType.value;
    const length =  this.registerForm.controls.long.value;
    const width = this.registerForm.controls.width.value;
    const height =  this.registerForm.controls.height.value;
    const weight = this.registerForm.controls.textWeight.value;
    const value = this.registerForm.controls.txtValue.value;
    const handle_instructions = this.registerForm.controls.txtNote.value;
    const coupon_code = this.registerForm.controls.txtCoupon.value;
    const service_id = this.registerForm.controls.deliveryService.value;
    const expected_pickup_from = this.registerForm.controls.timePickup.value[0].format('DD-MM-YYYY HH:mm');
    const expected_pickup_to = this.registerForm.controls.timePickup.value[1].format('DD-MM-YYYY HH:mm');
    const expected_delivery_from = this.registerForm.controls.timeDelivery.value[0].format('DD-MM-YYYY HH:mm');
    const expected_delivery_to = this.registerForm.controls.timeDelivery.value[1].format('DD-MM-YYYY HH:mm');
    const cod = this.registerForm.controls.txtCOD.value;
    const fee_payer = this.registerForm.controls.feePayer.value;
    const sender = {
      'name': nameSend,
      'phone': phoneSend,
      'address': addressSend,
      'location_id': locaSend
    };
    const receiver = {
        'name': nameReceiver,
        'phone': phoneReceiver,
        'address': addressReceiver,
        'location_id': locaReceiver
    };
    const size = {
      'length': length,
      'width': width,
      'height': height
    };
    this.parcelorderService.createParcelOrder( { sender, receiver, type, size, weight, value, handle_instructions,
        coupon_code, service_id, expected_pickup_from, expected_pickup_to,
        expected_delivery_from, expected_delivery_to, cod, fee_payer } as ParcelOrder )
      .subscribe(parcelsorders => {
        this.parcelsorders.push(parcelsorders);
      });
    this.messageService.sendMessage('Created', 'alert alert-success');
    // this.registerForm.reset();
  }
  public calculateFee(e: any): void {
    const headers = httpOptions.headers.set( 'Authorization' , this.token);
    const  options = {
      headers: headers
    };
    const locaReceiver =  +this.registerForm.controls.locaReceiver.value;
    const length =  this.registerForm.controls.long.value;
    const width = this.registerForm.controls.width.value;
    const height =  this.registerForm.controls.height.value;
    const weight = this.registerForm.controls.textWeight.value;
    const cod = this.registerForm.controls.txtCOD.value;
    const service_id = +this.registerForm.controls.deliveryService.value;
    const coupon_code = (this.registerForm.controls.txtCoupon.value).toString();
    let is_cod: number;
    if ( cod > 0 ) {
      is_cod = 1;
    } else {
      is_cod = 0;
    }
    const body: any = {
      'dest_location_id': locaReceiver,
      'weight': weight,
      'size': {
        'width': width,
        'height': height,
        'lenght': length
      },
      'coupon_code': coupon_code,
      'service_id': service_id,
      'is_cod': is_cod
    };

    if (weight > 0 && width > 0 && height > 0 && length > 0) {
      this.http.post('http://api.gnv.findsoft.vn/orders/fees', body, options ).subscribe(res => {
        console.log(res);
        const response: any =  res;
        this.feeMoney = response.data.Fee;
      });
    }
  }
  public changedSend(e: any): void {
    this.selectedSend = e.value;
  }
  public changedReceiver(e: any): void {
    this.selectedReceiver = e.value;
  }
  public changeDelivery(e: any): void {
    this.selectedDelivery = e.value;
  }
  public changeNote(e: any): void {
    this.selectedNote = e.value;
  }
  public changeType(e: any): void {
    this.selectedType = e.value;
  }
}
