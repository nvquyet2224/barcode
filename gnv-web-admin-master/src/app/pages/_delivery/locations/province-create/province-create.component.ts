import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';

import { Province } from '../../../../models/_delivery/index';
import { ProvinceService } from '../../../../services/_delivery/index';
import { MessageService } from '../../../../services/message.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-province-create',
  templateUrl: './province-create.component.html',
  styleUrls: ['./province-create.component.scss']
})
export class ProvinceCreateComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  message: any;
  subscription: Subscription;
  provinces: Province[] = [];
  constructor(
    private provinceService: ProvinceService,
    private messageService: MessageService
  ) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
  }

  ngOnInit() {}
  onSubmit() {
    const name = this.registerForm.controls.inputProvice.value;
    const mining_text = this.registerForm.controls.inputMining.value;
    this.provinceService.create({ name, mining_text  } as Province ).subscribe(provice => {
      this.provinces.push(provice)
    });

    this.messageService.sendMessage('User Provice', 'alert alert-success');
    this.registerForm.reset();
  }
}
