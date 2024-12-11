import { Component, OnInit } from '@angular/core';
import { FriendService } from '../services/friend.service';
import { DirectMessageService } from '../services/direct-message.service';
import { Chats } from '../models/chats.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-detail-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-sidebar.component.html',
  styleUrl: './detail-sidebar.component.css',
})
export class DetailSidebarComponent implements OnInit {
  chats: Chats[] = [];
  profileColor : any = localStorage.getItem("profile_color");
  profileName : any  = "";
  constructor(
    private dmService: DirectMessageService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.userService.userData.subscribe((data: User | null) => {
      this.profileColor = data?.profilePictureColor;
      this.profileName = data?.username;
    });

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
