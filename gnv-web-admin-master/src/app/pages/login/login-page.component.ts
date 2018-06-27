import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  @ViewChild('f') loginForm: NgForm;
  returnUrl = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private cookie: CookieService) {
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'];
    });
  }

  // On submit button click
  onSubmit() {
    const username = this.loginForm.controls.inputUsername.value;
    const password = this.loginForm.controls.inputPass.value;
    this.authService.login(username, password).then(
      result => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log(error);
      }
    );
    this.loginForm.reset();
  }



  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate(['forgotpassword']);
  }

  // On registration link click
  onRegister() {
    this.router.navigate(['register']);
  }
}
