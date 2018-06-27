import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';

import { AreaType } from '../../../../models/_delivery/index';
import { AreaTypeService } from '../../../../services/_delivery/index';
import { MessageService } from '../../../../services/message.service';

import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-area-type',
  templateUrl: './area-type.component.html',
  styleUrls: ['./area-type.component.scss']
})
export class AreaTypeComponent implements OnInit {
  constructor(
    private areaTypeService: AreaTypeService
  ) { }

  ngOnInit() {
    this.loadInit();
  }
  loadInit() {
    let response: any;
    this.areaTypeService.getAll()
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
