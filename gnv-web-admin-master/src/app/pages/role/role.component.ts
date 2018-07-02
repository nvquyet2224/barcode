import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  roles: Role[] = [];

  constructor( private roleService: RoleService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll(): void {
    let response: any;
    this.roleService.getAll()
      .subscribe( result => {
          console.log(result);
          response = result;
          this.roles = response.data.roles;
        },
        err => {
          console.log(err);
        }
      );
  }

}
