import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';

import { Locate } from '../../../../models/_delivery/locate';
import { Warehouse } from '../../../../models/_delivery/index';
import { LocationService, WarehouseService  } from '../../../../services/_delivery/index';
import { MessageService } from '../../../../services/message.service';
import { Subscription } from 'rxjs/Subscription';

interface DataItem {
  id: number;
  content: string;
}

@Component({
  selector: 'app-warehouse-create',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.scss']
})

export class WarehouseCreateComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  public select2Data: Array<Select2OptionData>;
  public selected: string;
  message: any;
  subscription: Subscription;
  locations: Locate[] = [];
  dataitem: DataItem[] = [];
  warehouses: Warehouse[] = [];
  isChecked: boolean;
  constructor( private locationService: LocationService,
               private warehouseService: WarehouseService,
               private messageService: MessageService ) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
  }
  ngOnInit() {
    this.loadInit();
  }
  loadInit() {
    let response: any;
    let item: any;
    let strLocation: string;
    let arrData = [];
    let dataLocation: any;
    this.locationService.getAll()
      .subscribe( result => {
          response = result;
          dataLocation = response.data.locations;
          for ( let i = 0; i < dataLocation.length; i++) {
            strLocation =  dataLocation[i].district.name + ' - ' + dataLocation[i].province.name + ' - ' +
                            ' ( ' + dataLocation[i].area_type.name + ' - ' + dataLocation[i].support_type.name + ' ) ';
            item = {
              id: dataLocation[i].id,
              text: strLocation
            };
            arrData.push(item);
          }
          this.isChecked = true;
          this.select2Data = arrData;
        },
        err => {
          console.log(arrData);
        }
      );
  }
  onSubmit() {
    const name = this.registerForm.controls.inputName.value;
    const mining_text = this.registerForm.controls.inputMining.value;
    const phone = this.registerForm.controls.inputPhone.value;
    const address = this.registerForm.controls.inputAddress.value;
    const status = this.registerForm.controls.radioStatus.value;
    const location_id = this.registerForm.controls.inputLocation.value;

    this.warehouseService.createWarehouse( { name, mining_text, phone, address, status, location_id } as Warehouse )
      .subscribe(warehouse => {
        this.warehouses.push(warehouse);
      });
    this.messageService.sendMessage('User Created', 'alert alert-success');
    this.registerForm.reset();
  }
  public changed(e: any): void {
    this.selected = e.value;
  }
}
