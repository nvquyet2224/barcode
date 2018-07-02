import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import {CookieService} from 'ngx-cookie-service';
import 'rxjs/add/operator/map';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  public token: string;
  private usersUrl = 'api/users';
  constructor(private http: HttpClient, private cookie: CookieService) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string) {
    const url = 'http://api.gnv.findsoft.vn/users/login/';
    let response: any;
    return this.http.post<User>( url , {
        username: username,
        password: password
    }).toPromise().then( result => {
      response = result;
      this.token = response.data.token;
      this.cookie.set('currentUser', JSON.stringify(result));
    });
  }

  signupUser(email: string, password: string) {
    // your code for signing up the new user
  }

  logout() {
    this.cookie.delete('currentUser');
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return this.cookie.check('currentUser');
  }

  getCurrentUser() {
    const user = this.cookie.get('currentUser');
    return JSON.parse(user);
  }
}
