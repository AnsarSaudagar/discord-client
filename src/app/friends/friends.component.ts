import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendSearchComponent } from './friend-search/friend-search.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { Router, RouterOutlet } from '@angular/router';
import { FriendSharingService } from '../services/friend-sharing.service';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css',
  host: {
    class: 'flex-[1]',
  },
})
export class FriendsComponent {
  constructor(
    private router: Router,
    private friendSharingService: FriendSharingService
  ) {}

  onClickAddFriend() {
    this.router.navigate(['home', 'friends', 'add']);
  }

  onClickFriendType(type: string) {
    this.friendSharingService.friendTypeSubject.next(
      +this.friendSharingService.types[type]
    );
    
    this.router.navigate(['home', 'friends']);
  }
}
