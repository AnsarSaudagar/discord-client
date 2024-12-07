import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendService } from '../../services/friend.service';
import { FriendRequestResponse } from '../../models/friend_request_response.model';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-friend-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './friend-search.component.html',
  styleUrl: './friend-search.component.css'
})
export class FriendSearchComponent {
  focusInput: boolean = false;
  friendInput: string = '';
  successRequest : boolean= false;
  errorRequest : boolean = false;
  showMessage : string = "";

  constructor(private friendService: FriendService, private socketService: SocketService) {}

  onClickFriendRequest() {
    this.friendService.sendFriendRequest(this.friendInput).subscribe({
      next: (res: FriendRequestResponse) => {
        this.successRequest = true;
        this.showMessage = `Success! Your friend request to ${this.friendInput}  was sent`;
      },
      error: (err) => {
          this.errorRequest = true;
          this.showMessage = `Hm, that didn’t work. Double-check that the username is correct.`;
      }
    });
  }

  onChangeFriendInput(){
    this.showMessage = "";
    this.successRequest = false;
    this.errorRequest = false;
  }
}
