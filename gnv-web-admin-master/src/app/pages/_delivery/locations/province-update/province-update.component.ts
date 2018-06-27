import { Component, OnInit,Input , ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';
import { ActivatedRoute } from '@angular/router';

import { Province } from '../../../../models/_delivery/index';
import { ProvinceService } from '../../../../services/_delivery/index';
import { MessageService } from '../../../../services/message.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-province-update',
  templateUrl: './province-update.component.html',
  styleUrls: ['./province-update.component.scss']
})
export class ProvinceUpdateComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  @Input() province: Province;
  constructor(
    private route: ActivatedRoute,
    private provinceService: ProvinceService
  ) { }

  ngOnInit() {
    this.loadInit();
  }
  loadInit() {
    let response: any;
    const id = +this.route.snapshot.paramMap.get('id');
    this.provinceService.getDetail(id)
      .subscribe( result => {
          response = result;
          this.province = response.data.provinces;

        },
        err => {
          console.log(err);
        }
      );
  }
  save(): void {
    this.provinceService.update(this.province)
      .subscribe(
        () => console.log('Update')
      );
  }
}
