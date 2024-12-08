import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { DmSentRequest } from '../models/dm_sent_request.model';
import { BehaviorSubject, tap } from 'rxjs';
import { Chats } from '../models/chats.model';
import { DirectMessages } from '../models/direct_messages.model';

@Injectable({
  providedIn: 'root',
})
export class DirectMessageService {
  private BASE_URL = environment.API_URL + 'dm/';
  private SENT_URL = this.BASE_URL + 'send';
  private GET_CHAT_URL = this.BASE_URL + 'get-chat';
  private MESSAGES_URL = this.BASE_URL + 'get?receiver_id=';

  public messagesSubject = new BehaviorSubject<DirectMessages[] | null>(null);
  public chatsSubject = new BehaviorSubject<Chats[]>([]);
  constructor(private http: HttpClient) {}

  sendChat(request_body: DmSentRequest) {
    return this.http.post<DirectMessages>(this.SENT_URL, request_body);
  }

  getInitiatedChats() {
    return this.http.get<Chats[]>(this.GET_CHAT_URL).pipe(
      tap((chats: Chats[]) => {
        this.chatsSubject.next(chats);
      })
    );
  }

  getMessages(receiver_id: number) {
    return this.http.get<DirectMessages[]>(this.MESSAGES_URL + receiver_id).pipe(
      tap((messages: DirectMessages[]) => {
        this.messagesSubject.next(messages);
      })
    );
  }
}
