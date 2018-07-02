import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';

import { Districts, Province } from '../../../../models/_delivery/index';
import { DistrictService, ProvinceService } from '../../../../services/_delivery/index';
import { MessageService } from '../../../../services/message.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-district-create',
  templateUrl: './district-create.component.html',
  styleUrls: ['./district-create.component.scss']
})
export class DistrictCreateComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  public select2Data: Array<Select2OptionData>;
  public selected: string;
  message: any;
  subscription: Subscription;
  districts: Districts[] = [];
  constructor(
    private districtService: DistrictService,
    private provinceService: ProvinceService,
    private messageService: MessageService
  ) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
  }

  ngOnInit() {
    this.loadInit();
  }
  loadInit() {
    let response: any;
    let item: any;
    let strName: string;
    let arrData = [];
    let dataArray: any;
    this.provinceService.getAll()
      .subscribe( result => {
          response = result;
          dataArray = response.data.provinces;
          for ( let i = 0; i < dataArray.length; i++) {
            strName =  dataArray[i].name ;
            item = {
              id: dataArray[i].id,
              text: strName
            };
            arrData.push(item);
          }
          this.select2Data = arrData;
          console.log(this.select2Data);
        },
        err => {
          console.log(err);
        }
      );
  }
  onSubmit() {
    const name = this.registerForm.controls.inputDistrict.value;
    const mining_text = this.registerForm.controls.inputMining.value;
    const province_id = this.registerForm.controls.inputProvinces.value;
    this.districtService.create({ name, mining_text, province_id  } as Districts ).subscribe(district => {
      this.districts.push(district)
    });
    this.messageService.sendMessage('User District', 'alert alert-success');
    this.registerForm.reset();
  }

  public changed(e: any): void {
    this.selected = e.value;
  }
}
