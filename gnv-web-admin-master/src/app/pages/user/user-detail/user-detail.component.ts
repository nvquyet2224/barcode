import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';

interface DetailUser {
  id: number;
  username: string;
  email: string;
  role: string;
  role_id: number;
  password: string;
  status: number;
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit {
  @Input() user: User;
  users: User[] = [];
  roles: Role[] = [];
  detailuser: DetailUser;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private location: Location) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    let response: any;
    const id = +this.route.snapshot.paramMap.get('id');

    this.roleService.getAll()
      .subscribe( result => {
          response = result;
          this.roles = response.data.roles;
        },
        err => {
          console.log(err);
        }
      );

    this.userService.getUser(id)
      .subscribe( result => {
          response = result;
          this.detailuser = response.data.users;
        },
        err => {
          console.log(err);
        }
      );
  }
  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe();
    this.location.back();
  }
  save(): void {
    this.userService.updateUser(this.detailuser)
      .subscribe(
        () => this.goBack()
      );
  }
  goBack(): void {
    this.location.back();
  }
}
