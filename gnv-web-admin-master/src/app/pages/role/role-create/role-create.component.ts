import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/role';


@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  roles: Role[] = [];
  constructor(private roleService: RoleService) { }

  ngOnInit() {
  }

  onSubmit(){
    const name =  this.registerForm.controls.fname.value;

    this.roleService.createRole( { name } as Role )
      .subscribe(role => {
        console.log(role);
        this.roles.push(role);
      });
    this.registerForm.reset();

  }
}
