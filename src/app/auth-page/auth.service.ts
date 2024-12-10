import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { LoginCredentials, LoginResponse } from '../models/login.model';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CacheService } from '../services/cache.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = environment.API_URL + 'auth/';
  private LOGIN_URL = this.BASE_URL + 'login';
  private SIGNUP_URL = this.BASE_URL + 'signup';

  private tokenExpirationTimer: any;
  private readonly TOKEN_KEY = 'authToken';

  user = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private cacheService :CacheService
  ) {}

  signup(user: User) {
    return this.http.post<User>(this.SIGNUP_URL, user);
  }

  login(credentials: LoginCredentials) {
    return this.http.post<LoginResponse>(this.LOGIN_URL, credentials).pipe(
      tap((response: LoginResponse) => {
        this.handleAuthentication(response.token);
        this.userService.getLoggedUserData().subscribe();
      }),

      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  autoLogin() {
    const token = this.getToken();
    if (!token) return;

    this.userService.getLoggedUserData().subscribe();

    const decodedToken = this.decodeToken(token);

    const expirationDate = new Date(decodedToken.exp * 1000);

    if (expirationDate > new Date()) {
      this.user.next({ email: decodedToken.sub } as User);
      this.autoLogout(decodedToken.exp * 1000 - Date.now());
    } else {
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('id');
    localStorage.removeItem('profile_color');
    this.user.next(null);
    clearTimeout(this.tokenExpirationTimer);
    this.router.navigateByUrl('/auth/login');
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(token: string) {
    const decodedToken = this.decodeToken(token);
    const expirationTime = new Date(decodedToken.exp * 1000);

    this.cacheService.getUserProfileColor(decodedToken.id).subscribe((colorData : any) => {
      localStorage.setItem('profile_color', colorData.color);
    })

    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem('id', decodedToken.id);

    this.user.next({ email: decodedToken.sub } as User);

    this.autoLogout(decodedToken.exp * 1000 - Date.now());
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];

    return JSON.parse(atob(payload));
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getLoggedUserData() {}
}
