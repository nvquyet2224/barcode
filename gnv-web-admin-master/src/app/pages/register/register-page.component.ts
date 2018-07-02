import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service'
import { User } from '../../models/user';


@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent {
    @ViewChild('f') registerForm: NgForm;

    users: User[] = [];

    constructor(private router: Router,
        private route: ActivatedRoute,
        private userService: UserService) { }

    //  On submit click, reset field value
    onSubmit() {
        const username = this.registerForm.controls.fname.value;
        const email = this.registerForm.controls.inputEmail.value;
        const password = this.registerForm.controls.inputPass.value;

        this.userService.createUser( { username, email, password } as User )
            .subscribe(user => {
                this.users.push(user);
        });
        this.registerForm.reset();
    }

    onLogin(){
        this.router.navigate(['login']);
    }
}
