import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendService } from '../services/friend.service';
import { FriendRequestResponse } from '../models/friend_request_response.model';

@Component({
  selector: 'app-chat-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-section.component.html',
  styleUrl: './chat-section.component.css',
  host: {
    class: 'flex-[1]',
  },
})
export class ChatSectionComponent {
  focusInput: boolean = false;
  friendInput: string = '';

  // success  #21A559
  // Success! Your friend request to ansar.dev_56399  was sent.

  // error #F23F43
  // Hm, that didn’t work. Double-check that the username is correct.
  constructor(private friendService: FriendService) {}

  onClickFriendRequest() {
    this.friendService.sendFriendRequest(this.friendInput).subscribe({
      next: (res: FriendRequestResponse) => {
        console.log(res);
      },
    });
  }
}
