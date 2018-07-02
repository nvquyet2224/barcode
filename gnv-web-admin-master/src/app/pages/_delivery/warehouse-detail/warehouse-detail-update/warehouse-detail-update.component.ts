import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';

import { WarehouseDetail } from '../../../../models/_delivery/index';
import { WarehouseDetailService, WarehouseService  } from '../../../../services/_delivery/index';
import { MessageService } from '../../../../services/message.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-warehouse-detail-update',
  templateUrl: './warehouse-detail-update.component.html',
  styleUrls: ['./warehouse-detail-update.component.scss']
})
export class WarehouseDetailUpdateComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  @Input() warehousedetail: WarehouseDetail;
  isChecked: boolean;
  public select2Data: Array<Select2OptionData>;
  public selected: string;
  public startValue: string;
  constructor(
    private route: ActivatedRoute,
    private warehousedetailService: WarehouseDetailService,
    private warehouseService: WarehouseService,
  ) { }

  ngOnInit() {
    this.getWarehouseDetail()
  }

  getWarehouseDetail(): void {
    let response: any;
    const id = +this.route.snapshot.paramMap.get('id');
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
          this.select2Data = arrData;
        },
        err => {
          console.log(arrData);
        }
      );

    this.warehousedetailService.getWarehouseDetail(id)
      .subscribe( result => {
          response = result;
          this.isChecked = true;
          this.warehousedetail = response.data.warehousedetails;
          // this.warehouse.location_id = response.data.warehouses[0].location.id;
          // this.startValue = (response.data.warehouses[0].location.id).toString();
          // this.selected = (response.data.warehouses[0].location.id).toString();
        },
        err => {
          console.log(err);
        }
      );
  }

  save(): void {
    this.warehousedetailService.updateWarehouseDetail(this.warehousedetail)
      .subscribe(
        () => console.log('Update')
      );
  }

  public changed(e: any): void {
    this.selected = e.value;
  }
}
