import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../services/permission.service';
import { Permission } from '../../models/permission';
import { RoleService } from '../../services/role.service'
import { Role } from '../../models/role'

interface ListPermission {
  id: number;
  role: string;
  role_id: number;
  target_name: string;
  permission: string;
  status: number;
}

@Component({
  selector: 'app-permission-management',
  templateUrl: './permission-management.component.html',
  styleUrls: ['./permission-management.component.scss']
})
export class PermissionManagementComponent implements OnInit {
  permissions: Permission[] = [];
  listpermission: ListPermission[] = [];
  constructor( private permissionService: PermissionService ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    let response: any;
    this.permissionService.getAll()
      .subscribe( result => {
          response = result;
          this.listpermission = response.data.permissions;
          console.log(result);
        },
        err => {
          console.log(err);
        }
      );
  }
}
