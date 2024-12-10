import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { DmSentRequest } from '../models/dm_sent_request.model';
import { BehaviorSubject, forkJoin, tap } from 'rxjs';
import { Chats } from '../models/chats.model';
import { DirectMessages } from '../models/direct_messages.model';
import { CacheService } from './cache.service';

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
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  sendChat(request_body: DmSentRequest) {
    return this.http.post<DirectMessages>(this.SENT_URL, request_body);
  }

  getInitiatedChats() {
    return this.http.get<Chats[]>(this.GET_CHAT_URL).pipe(
      tap((chats: Chats[]) => {
        // Extracting the user IDs for which we need the profile colors
        const chatsIds = chats.map((chat: Chats) => chat.other_user_id);
  
        // Make both API calls (get chats and get profile colors) in parallel using forkJoin
        forkJoin({
          chats: this.http.get<Chats[]>(this.GET_CHAT_URL),
          colors: this.cacheService.getProfileColors(chatsIds)
        }).subscribe({
          next: ({ chats, colors }) => {
            const colorObject = colors.colorData.reduce((acc: any, item: any) => {
              acc[item.userId] = item.color;
              return acc;
            }, {});
  
            // Map the chats with the corresponding colors
            const newChats : Chats[] = chats.map((chat: Chats) => {
              const profilePictureColor = colorObject[chat.other_user_id] || '#000000'; // Default to black if color is not found
              return { ...chat, profilePictureColor };
            });
  
            // Emit the updated chats to the subject
            this.chatsSubject.next(newChats);
          },
          error: (err) => {
            console.error('Error occurred while fetching chats or colors:', err);
          }
        });
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
