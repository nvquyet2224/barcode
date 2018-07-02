import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service'
import { User } from '../../../models/user';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';
import { MessageService } from '../../../services/message.service'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;

  message: any;
  subscription: Subscription;
  users: User[] = [];
  roles: Role[] = [];

  public editorValue: string = '';

  constructor( private userService: UserService,
               private roleService: RoleService,
               private messageService: MessageService ) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
  }

  ngOnInit() {
    this.loadInit();
  }
  loadInit() {
    let response: any;
    this.roleService.getAll()
      .subscribe( result => {
          response = result;
          this.roles = response.data.roles;
        },
        err => {
          console.log(err);
        }
      );
  }

  onSubmit() {
    const username = this.registerForm.controls.fname.value;
    const email = this.registerForm.controls.inputEmail.value;
    const password = this.registerForm.controls.inputPass.value;
    const role_id = +this.registerForm.controls.selectRole.value;
    const status = 0;
    this.userService.createUser( { username, email, password, role_id, status } as User )
      .subscribe(user => {
        this.users.push(user);
      });
    this.messageService.sendMessage('User Created', 'alert alert-success');
    this.registerForm.reset();
  }
}
