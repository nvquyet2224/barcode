import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';

import { Province } from '../../../../models/_delivery/index';
import { ProvinceService } from '../../../../services/_delivery/index';
import { MessageService } from '../../../../services/message.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements OnInit {

  constructor(
    private provinceService: ProvinceService
  ) { }

  ngOnInit() {
    this.loadInit();
  }
  loadInit() {
    let response: any;
    this.provinceService.getAll()
      .subscribe( result => {
          response = result;
          console.log(response);
        },
        err => {
          console.log(err);
        }
      );
  }
}
