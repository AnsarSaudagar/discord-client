import { Component } from '@angular/core';
import { FriendService } from '../services/friend.service';

@Component({
  selector: 'app-detail-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './detail-sidebar.component.html',
  styleUrl: './detail-sidebar.component.css',
})
export class DetailSidebarComponent {
  constructor(private friendService: FriendService) {
  }
}
