import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendRequestSectionComponent } from './friend-request-section/friend-request-section.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';

@Component({
  selector: 'app-chat-section',
  standalone: true,
  imports: [CommonModule, FormsModule, FriendRequestSectionComponent, FriendRequestsComponent],
  templateUrl: './chat-section.component.html',
  styleUrl: './chat-section.component.css',
  host: {
    class: 'flex-[1]',
  },
})
export class ChatSectionComponent {
  
}
