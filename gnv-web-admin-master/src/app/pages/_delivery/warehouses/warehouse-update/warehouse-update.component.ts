import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';

import { Warehouse } from '../../../../models/_delivery/index';
import { LocationService, WarehouseService  } from '../../../../services/_delivery/index';
import { MessageService } from '../../../../services/message.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-warehouse-update',
  templateUrl: './warehouse-update.component.html',
  styleUrls: ['./warehouse-update.component.scss']
})
export class WarehouseUpdateComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  @Input() warehouse: Warehouse;
  isChecked: boolean;
  public select2Data: Array<Select2OptionData>;
  public selected: string;
  public startValue: string;
  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private warehouseService: WarehouseService,
  ) { }

  ngOnInit() {
    this.getWarehouse();
  }
  getWarehouse(): void {
    let response: any;
    const id = +this.route.snapshot.paramMap.get('id');
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
          this.select2Data = arrData;
          console.log(dataLocation);
        },
        err => {
          console.log(arrData);
        }
      );

    this.warehouseService.getWarehouse(id)
      .subscribe( result => {
          response = result;
          this.isChecked = true;
          this.warehouse = response.data.warehouses[0];
          this.warehouse.location_id = response.data.warehouses[0].location.id;
          this.startValue = (response.data.warehouses[0].location.id).toString();
          this.selected = (response.data.warehouses[0].location.id).toString();
        },
        err => {
          console.log(err);
        }
      );
  }
  save(): void {
    this.warehouse.location_id = +this.selected;
    this.warehouseService.updateWarehouse(this.warehouse)
      .subscribe(
        () => console.log('Update')
      );
  }

  public changed(e: any): void {
    this.selected = e.value;
  }
}
