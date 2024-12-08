import { Component, OnInit } from '@angular/core';
import { FriendService } from '../services/friend.service';
import { DirectMessageService } from '../services/direct-message.service';
import { Chats } from '../models/chats.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './detail-sidebar.component.html',
  styleUrl: './detail-sidebar.component.css',
})
export class DetailSidebarComponent implements OnInit {
  chats: Chats[] = [];

  constructor(
    private dmService: DirectMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dmService.getInitiatedChats().subscribe();
    this.dmService.chatsSubject.subscribe({
      next: (chats: Chats[]) => {
        this.chats = chats;
      },
    });
  }

  onClickFriends() {
    this.router.navigate(['home', 'friends']);
  }

  onClickChat(message_id: number, other_user_id: number) {
    this.router.navigate(['home', 'chat', message_id, other_user_id]);
  }
}
