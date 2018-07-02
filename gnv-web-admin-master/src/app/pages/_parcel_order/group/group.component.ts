import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { any } from 'codelyzer/util/function';
import { Locate } from '../../../models/_delivery/locate';
import { Warehouse } from '../../../models/_delivery/index';
import { ParcelOrder } from '../../../models/_parcel_order/index';
import { LocationService, WarehouseService, DeliveryService } from '../../../services/_delivery/index';
import { ParcelOrderService } from '../../../services/_parcel_order/index';
import { MessageService } from '../../../services/message.service';
import { Subscription } from 'rxjs/Subscription';
import {AuthService} from '../../../services/auth.service';

interface DataItem {
  id: number;
  content: string;
}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  public receiver2Data: Array<Select2OptionData>;
  public send2Data: Array<Select2OptionData>;
  public delivery2Data: Array<Select2OptionData>;
  public group2Data: Array<Select2OptionData>;
  public type2Data: Array<Select2OptionData>;
  public selectedSend: string;
  public selectedReceiver: string;
  public selectedDelivery: string;
  public selectedNote: string;
  public selectedType: string;
  public selectedGroupBy: string;
  public selectedMoment = new Date();
  public selectedMoment2 = new FormControl(new Date());
  public selectedMoments = [new Date(2018, 1, 12, 10, 30), new Date(2018, 3, 21, 20, 30)];
  private token: string = this.authService.getCurrentUser().data.token;
  message: any;
  subscription: Subscription;
  locations: Locate[] = [];
  dataitem: DataItem[] = [];
  warehouses: Warehouse[] = [];
  parcelsorders: ParcelOrder[] = [];
  isChecked: boolean;
  feeMoney: number;
  dataGroup: any;
  constructor(private http: HttpClient,
              private locationService: LocationService,
              private authService: AuthService,
              private warehouseService: WarehouseService,
              private deliveryService: DeliveryService,
              private parcelorderService: ParcelOrderService,
              private messageService: MessageService ) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
  }
  ngOnInit() {
    this.group2Data = this.parcelorderService.getGroup();
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
  onSubmit () {
    const headers = httpOptions.headers.set( 'Authorization' , this.token);
    const  options = {
      headers: headers
    };
    const groupBy = this.registerForm.controls.groupBy.value;
    const toTime = this.registerForm.controls.toTime.value;
    const fromTime = this.registerForm.controls.fromTime.value;
    const locaSend = this.registerForm.controls.locaSend.value;
    const locaReceiver = this.registerForm.controls.locaReceiver.value;
    const body: any = {
      'datetime_type': groupBy,
      'from_datetime': fromTime,
      'to_datetime': toTime,
      'pickup_location_id': locaSend,
      'deliver_location_id': locaReceiver
    };
    this.http.post('http://api.gnv.findsoft.vn/orders/group', body, options ).subscribe(res => {
      const response: any =  res;
      this.dataGroup = response.data.order;
      console.log(this.dataGroup);
    });
  }
  public changedSend(e: any): void {
    this.selectedSend = e.value;
  }
  public changedReceiver(e: any): void {
    this.selectedReceiver = e.value;
  }
  public changedGroupBy(e: any): void {
    this.selectedGroupBy = e.value;
  }
}
