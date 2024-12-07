import { Component, OnInit } from '@angular/core';
import { FriendService } from '../services/friend.service';
import { DirectMessageService } from '../services/direct-message.service';
import { Chats } from '../models/chats.model';

@Component({
  selector: 'app-detail-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './detail-sidebar.component.html',
  styleUrl: './detail-sidebar.component.css',
})
export class DetailSidebarComponent implements OnInit {

  chats : Chats[] = [];

  constructor(private dmService: DirectMessageService) {}

  ngOnInit(): void {
    this.dmService.getInitiatedChats().subscribe();
    this.dmService.chatsSubject.subscribe({
      next: (chats : Chats[]) => {
        this.chats = chats;
      }
    })
  }
}
