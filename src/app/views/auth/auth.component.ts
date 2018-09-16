import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  mode = 'login';
  errorText = '';
  user: UserModel;
  formDisable = false;
  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(public authService: AuthService, private router: Router) {
    this.authService.signalLogin.subscribe(
      (message: string) => {
        console.log(message);
        this.user = this.authService.userData;
        this.router.navigate(['/']);
      }
    );
    this.authService.signalFail.subscribe(
      (message: string) => {
        console.error(message);
      }
    );
    this.authService.validateToken();
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(
        null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(64)]
      ),
      'password': new FormControl(
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(64)]
      )
    });

    this.signupForm = new FormGroup({
      'username': new FormControl(
        null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(64)]
      ),
      'email': new FormControl(
        null,
        [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(64)]
      ),
      'password': new FormControl(
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(64)]
      ),
      'first_name': new FormControl(
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(64)]
      ),
      'last_name': new FormControl(
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(64)]
      )
    });
  }

  onSubmitLogin() {
    this.formDisable = true;
    this.authService.login({...this.loginForm.value});
  }

  onSubmitSignup() {
    console.log(this.signupForm);
    this.formDisable = true;
  }

}
