import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { FriendRequestResponse } from '../models/friend_request_response.model';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private BASE_URL = environment.API_URL + 'friends/';
  private REQUEST_URL = this.BASE_URL + 'request?username=';
  constructor(private http: HttpClient) {}

  sendFriendRequest(username: string) {
    return this.http.post<FriendRequestResponse>(this.REQUEST_URL + username, {});
  }
}
