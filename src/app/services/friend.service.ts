import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { FriendRequestResponse } from '../models/friend_request_response.model';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private BASE_URL = environment.API_URL + 'friends/';
  private REQUEST_URL = this.BASE_URL + 'request?username=';
  private PENDING_REQUEST_URL = this.BASE_URL + 'request';
  private ACCEPT_REQUEST_URL = this.BASE_URL + "accept-friend?id=";
  private DELETE_REQUEST_URL = this.BASE_URL + "delete-friend?id=";
  constructor(private http: HttpClient) {}

  public pendingRequestSubject = new BehaviorSubject([]);
  public requestSubject$ = this.pendingRequestSubject.asObservable();

  sendFriendRequest(username: string) {
    return this.http.post<FriendRequestResponse>(
      this.REQUEST_URL + username,
      {}
    );
  }

  getPendingRequests() {
    return this.http.get(this.PENDING_REQUEST_URL).pipe(
      tap((data: any) => {
        this.pendingRequestSubject.next(data);
      })
    );
  }

  acceptFriendRequest(id : number, receiver_id: number){
    return this.http.patch(this.ACCEPT_REQUEST_URL + id + "&receiverId=" + receiver_id, {});
  }

  deleteFriendRequest(id : number){
    return this.http.delete(this.DELETE_REQUEST_URL + id, {});
  }


}
