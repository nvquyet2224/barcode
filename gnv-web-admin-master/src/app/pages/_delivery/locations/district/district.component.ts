import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';

import { Districts } from '../../../../models/_delivery/index';
import { DistrictService } from '../../../../services/_delivery/index';
import { MessageService } from '../../../../services/message.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {

  constructor(
    private districtService: DistrictService
  ) { }

  ngOnInit() {
    this.loadInit();
  }
  loadInit() {
    let response: any;
    this.districtService.getAll()
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
