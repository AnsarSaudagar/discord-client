import { Component } from '@angular/core';
import { AuthService } from '../auth-page/auth.service';
import { MainSidebarComponent } from '../main-sidebar/main-sidebar.component';
import { DetailSidebarComponent } from '../detail-sidebar/detail-sidebar.component';
import { ChatSectionComponent } from '../chat-section/chat-section.component';
import { FriendRequestsComponent } from '../friend-requests/friend-requests.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainSidebarComponent, DetailSidebarComponent, ChatSectionComponent ,FriendRequestsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private authService : AuthService){

  }
  ngOnInit(){
  }
}
