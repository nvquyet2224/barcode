import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { RoleService } from '../../services/role.service'
import { Role } from '../../models/role'
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs/Subscription';

interface ListUser {
  id: number;
  username: string;
  email: string;
  role: string;
  status: boolean;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  message: any;
  subscription: Subscription;
  users: User[] = [];
  listeners: ListUser[] = [];
  constructor(private userService: UserService,
              private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    let response: any;
    this.userService.getAll()
      .subscribe( result => {
          this.messageService.sendMessage('Fetch All User', 'alert alert-success');
          response = result;
          this.listeners = response.data.users;
        },
        err => {
          console.log(err);
        }
      );
  }

  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe();
  }
}
