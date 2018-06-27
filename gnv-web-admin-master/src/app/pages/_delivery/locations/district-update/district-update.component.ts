import { Component, OnInit,Input , ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';
import { ActivatedRoute } from '@angular/router';

import { Province, Districts } from '../../../../models/_delivery/index';
import { ProvinceService, DistrictService } from '../../../../services/_delivery/index';
import { MessageService } from '../../../../services/message.service';

import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-district-update',
  templateUrl: './district-update.component.html',
  styleUrls: ['./district-update.component.scss']
})
export class DistrictUpdateComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  @Input() districts: Districts;
  public select2Data: Array<Select2OptionData>;
  public selected: string;
  public startValue: string;
  constructor(
    private route: ActivatedRoute,
    private provinceService: ProvinceService,
    private districtService: DistrictService
  ) { }

  ngOnInit() {
    this.loadInit();
  }
  loadInit() {
    let response: any;
    const id = +this.route.snapshot.paramMap.get('id');
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
        },
        err => {
          console.log(err);
        }
      );
    this.districtService.getDetail(id)
      .subscribe( result => {
          response = result;
          console.log(response);
          this.districts = response.data.districts;
          this.startValue = (response.data.districts.province_id).toString();
          console.log(this.startValue);
          this.selected = (response.data.districts.province_id).toString();
        },
        err => {
          console.log(err);
        }
      );
  }
  save(): void {
    this.districts.province_id = +this.selected;
    this.districtService.update(this.districts)
      .subscribe(
        () => console.log('Update')
      );
  }
  public changed(e: any): void {
    this.selected = e.value;
  }
}
