import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { DmSentRequest } from '../models/dm_sent_request.model';
import { BehaviorSubject, tap } from 'rxjs';
import { Chats } from '../models/chats.model';

@Injectable({
  providedIn: 'root',
})
export class DirectMessageService {
  private BASE_URL = environment.API_URL + 'dm/';
  private SENT_URL = this.BASE_URL + 'send';
  private GET_CHAT_URL = this.BASE_URL + 'get-chat';

  public chatsSubject = new BehaviorSubject<Chats[]>([]);
  constructor(private http: HttpClient) {}

  sendChat(request_body: DmSentRequest) {
    return this.http.post(this.SENT_URL, request_body);
  }

  getInitiatedChats() {
    return this.http.get<Chats[]>(this.GET_CHAT_URL).pipe(
      tap((chats: Chats[]) => {
        this.chatsSubject.next(chats);
      })
    );
  }
}
