import { Component, OnInit } from '@angular/core';
// import library
import { MessageService } from '../../../services/message.service';
import { Subscription } from 'rxjs/Subscription';

// import service
import { WarehouseService } from '../../../services/_delivery/index';
// import model
import { Warehouse } from '../../../models/_delivery/warehouse';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {
  message: any;
  subscription: Subscription;
  warehouses: Warehouse[] = [];
  constructor( private warehouseService: WarehouseService,
               private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    let response: any;
    this.warehouseService.getAll()
      .subscribe( result => {
          this.messageService.sendMessage('Fetch All Warehouse', 'alert alert-success');
          response = result;
          console.log(response);
          this.warehouses = response.data.users;
        },
        err => {
          console.log(err);
        }
      );
  }
}
