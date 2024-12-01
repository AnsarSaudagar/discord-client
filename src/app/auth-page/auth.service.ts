import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { LoginCredentials, LoginResponse } from '../models/login.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = environment.API_URL + 'auth/';
  private LOGIN_URL = this.BASE_URL + 'login';
  private SIGNUP_URL = this.BASE_URL + 'signup';

  constructor(private http: HttpClient) {}

  signup(user: User) {
    return this.http.post<User>(this.SIGNUP_URL, user);
  }

  login(credentials : LoginCredentials){
    return this.http.post<LoginResponse>(this.LOGIN_URL, credentials);
  }
}
