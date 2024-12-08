import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user.model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = environment.API_URL + "users/";
  private MY_DATA_URL = this.BASE_URL + "me";
  private USER_DATA_URL = this.BASE_URL + "friend-data?id=";
  private LOGGED_DATA_URL = this.BASE_URL + "me";

  userData = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

  getLoggedUserData(){
    return this.http.get<User>(this.LOGGED_DATA_URL).pipe(
      tap((user: User) => {
        this.userData.next(user);
      })
    );
  }

  getUserData(id : number){
    return this.http.get<User>(this.USER_DATA_URL + id);
  }
}
