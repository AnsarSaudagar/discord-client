import { Component, OnInit } from '@angular/core';
import { LayoutWrapperComponent } from '../wrappers/layout-wrapper/layout-wrapper.component';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { DirectMessages } from '../models/direct_messages.model';
import { DirectMessageService } from '../services/direct-message.service';
import { FormatDatePipe } from '../shared/pipes/format-date.pipe';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../services/socket.service';
import { CacheService } from '../services/cache.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [LayoutWrapperComponent, FormatDatePipe, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  host: {
    class: 'flex-[1] relative',
  },
})
export class ChatComponent implements OnInit {
  friendData!: User | null | null;
  message_id!: number;
  friend_id!: number;
  loggedData!: User | null;
  message: string | null = null;

  messages!: DirectMessages[] | null;
  userColor: string | null = '';
  userId: number | null | string = null;

  hideSidebar : boolean = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private directMessageService: DirectMessageService,
    private socketService: SocketService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (paramsMap: any) => {
        this.message_id = +paramsMap.params.chat_id;
        this.friend_id = +paramsMap.params.other_user_id;

        this.directMessageService.getMessages(this.friend_id).subscribe();

        this.directMessageService.messagesSubject.subscribe({
          next: (messages: DirectMessages[] | null) => {
            this.messages = messages;
          },
        });

        this.socketService.socket.on('new_message', () => {
          this.directMessageService.getMessages(this.friend_id).subscribe();
        });

        this.userService
          .getUserData(+paramsMap.params.other_user_id)
          .subscribe({
            next: (user_data: User) => {
              this.friendData = user_data;
              this.cacheService
                .getUserProfileColor(user_data.id)
                .subscribe((colorData: any) => {
                  if (!this.friendData) return;
                  this.friendData.profilePictureColor = colorData.color;
                  
                });
            },
          });

        this.userColor = localStorage.getItem('profile_color')
          ? localStorage.getItem('profile_color')
          : '#FAA619';
        if (localStorage.getItem('id')) {
          this.userId = Number(localStorage.getItem('id'));
        }
      },
    });
  }

  getFriendData() {}

  onEnter() {
    if (this.message && this.message.length > 0) {
      this.directMessageService
        .sendChat({
          messageText: this.message,
          receiver_id: this.friend_id,
        })
        .subscribe({
          next: (chat: DirectMessages) => {
            this.message = null;
            this.directMessageService.getMessages(this.friend_id).subscribe();
          },
        });
    }
  }
}
