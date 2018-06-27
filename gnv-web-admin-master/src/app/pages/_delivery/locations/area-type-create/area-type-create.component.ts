import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';

import { AreaType } from '../../../../models/_delivery/index';
import { AreaTypeService } from '../../../../services/_delivery/index';
import { MessageService } from '../../../../services/message.service';

import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-area-type-create',
  templateUrl: './area-type-create.component.html',
  styleUrls: ['./area-type-create.component.scss']
})
export class AreaTypeCreateComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  message: any;
  subscription: Subscription;
  areaTypes: AreaType[] = [];
  constructor(
    private areaTypeService: AreaTypeService,
    private messageService: MessageService
  ) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
  }

  ngOnInit() {}
  onSubmit() {
    const name = this.registerForm.controls.inputAreaType.value;
    const price = this.registerForm.controls.inputPrice.value;
    this.areaTypeService.create({ name, price  } as AreaType ).subscribe(areatype => {
      this.areaTypes.push(areatype)
    });

    this.messageService.sendMessage('Create', 'alert alert-success');
    this.registerForm.reset();
  }
}
