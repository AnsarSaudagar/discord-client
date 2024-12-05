import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendSearchComponent } from './friend-search/friend-search.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css',
  host: {
    class: 'flex-[1]',
  },
})
export class FriendsComponent {
  
}
