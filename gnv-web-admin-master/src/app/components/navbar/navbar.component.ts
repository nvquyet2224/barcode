import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  constructor(private authService: AuthService, private route: Router) { }

  logout() {
    this.authService.logout();
    this.route.navigate(['/login'], {queryParams: {returnUrl: this.route.url}});
  }
}
