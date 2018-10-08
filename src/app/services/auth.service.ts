import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {EventEmitter, Injectable} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Observable, Observer} from 'rxjs';

@Injectable()
export class AuthService {
  userData: UserModel;
  currentStatus = 'basic';
  inProgress = 0;
  signalLogin = new EventEmitter<string>();
  signalFail = new EventEmitter<string>();

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    this.validateToken();
  }

  validateToken() {
    this.inProgress++;

    const token = this.cookieService.get('auth-token');
    if (token === '') {
      this.signalFail.emit('no token exists');
    }
    const headerToken = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token
    });

    this.httpClient.get('http://localhost:8000/api/self/', {
      headers: headerToken
    }).subscribe(
      (user: {}) => {
        console.log(user);
        this.userData = UserModel.userFactory(user);
        this.cookieService.put('auth-token', token);
        this.inProgress--;
        this.currentStatus = 'login';
        this.signalLogin.emit('available token is valid');
      },
      (err) => {
        this.cookieService.remove('auth-token');
        this.inProgress--;
        this.currentStatus = 'basic';
        this.signalFail.emit('');
      }
    );
  }

  getHeader() {
    const token = this.cookieService.get('auth-token');
    if (token === '') {
      this.validateToken();
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token
    });
  }

  login(loginData: {username: string, password: string}) {
    this.inProgress++;
    const headerLogin = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.httpClient.post<{token: string}>('http://localhost:8000/api/token-auth/', loginData, {
      headers: headerLogin
    }).subscribe(
      (token: {token: string}) => {
        this.cookieService.put('auth-token', token.token);
        this.validateToken();
        this.inProgress--;
      },
      (err) => {
        this.cookieService.remove('auth-token');
        this.userData = undefined;
        this.currentStatus = 'basic';
        this.signalFail.emit('username and password do not match');
        this.inProgress--;
      }
    );
  }

  signup(userData: {username: string, email: string, password: string, first_name: string, last_name: string}) {
    this.inProgress++;
    const headerSignup = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    userData['profile'] = {};

    this.httpClient.post(
      'http://localhost:8000/api/users/',
      userData,
      {
        headers: headerSignup
      }).subscribe(
      (data) => {
        console.log('sign up successful');
        this.login({username: userData.username, password: userData.password});
        this.inProgress--;
      },
      (err) => {
        console.error('sign up failed');
        console.error(err);
        this.inProgress--;
      }
    );
  }

  logout() {
    this.cookieService.remove('auth-token');
    this.userData = undefined;
    this.currentStatus = 'basic';
  }
}
