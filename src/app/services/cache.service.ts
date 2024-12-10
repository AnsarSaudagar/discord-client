import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private SOCKET_URL = environment.SOCKET_URL;

  constructor(private http: HttpClient) { }

  getUserProfileColor(user_id : number ){
    return this.http.get(this.SOCKET_URL + 'get-user-profile-color/' + user_id);
  }

  getProfileColors(userIds: number[]): Observable<any> {
    
    return this.http.post(`${this.SOCKET_URL}get-user-profile-colors`, { ids: userIds });
  }
}
