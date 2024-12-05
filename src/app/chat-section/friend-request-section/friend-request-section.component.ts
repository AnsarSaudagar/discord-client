import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendService } from '../../services/friend.service';
import { FriendRequestResponse } from '../../models/friend_request_response.model';

@Component({
  selector: 'app-friend-request-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './friend-request-section.component.html',
  styleUrl: './friend-request-section.component.css'
})
export class FriendRequestSectionComponent {
  focusInput: boolean = false;
  friendInput: string = '';
  successRequest : boolean= false;
  errorRequest : boolean = false;
  showMessage : string = "";

  constructor(private friendService: FriendService) {}

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
