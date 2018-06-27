import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';

import { Warehouse, WarehouseDetail } from '../../../../models/_delivery/index';
import { WarehouseDetailService, WarehouseService  } from '../../../../services/_delivery/index';
import { MessageService } from '../../../../services/message.service';

import { Subscription } from 'rxjs/Subscription';

interface DataItem {
  id: number;
  content: string;
}
@Component({
  selector: 'app-warehouse-detail-create',
  templateUrl: './warehouse-detail-create.component.html',
  styleUrls: ['./warehouse-detail-create.component.scss']
})
export class WarehouseDetailCreateComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  public select2Data: Array<Select2OptionData>;
  public selected: string;
  message: any;
  subscription: Subscription;
  warehousedetails: WarehouseDetail[] = [];
  isChecked: boolean;
  constructor( private warehouseDetailService: WarehouseDetailService,
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
    let warehose_name: string;
    let arrData = [];
    let dataWarehouse: any;
    this.warehouseService.getAll()
      .subscribe( result => {
          response = result;
          dataWarehouse = response.data.warehouses;
          for ( let i = 0; i < dataWarehouse.length; i++) {
            warehose_name =  dataWarehouse[i].name + ' [ ' + dataWarehouse[i].address + ' ]';
            item = {
              id: dataWarehouse[i].id,
              text: warehose_name
            };
            arrData.push(item);
          }
          this.isChecked = true;
          this.select2Data = arrData;
        },
        err => {
          console.log(err);
        }
      );
  }

  onSubmit() {
    const rack = this.registerForm.controls.inputRack.value;
    const bay = this.registerForm.controls.inputBay.value;
    const level = this.registerForm.controls.inputLevel.value;
    const position = this.registerForm.controls.inputPosition.value;
    const description = this.registerForm.controls.inputDescription.value;
    const status = this.registerForm.controls.radioStatus.value;
    const warehouse_id = this.registerForm.controls.inputWarehouse.value;

    this.warehouseDetailService.createWarehouseDetail(
      { rack, bay, level, position, warehouse_id, status, description  } as WarehouseDetail ).subscribe(warehousedetail => {
      this.warehousedetails.push(warehousedetail)
    });

    this.messageService.sendMessage('User Created', 'alert alert-success');
    this.registerForm.reset();
  }
  public changed(e: any): void {
    this.selected = e.value;
  }
}
