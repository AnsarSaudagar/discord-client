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
}
