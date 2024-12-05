import { Component } from '@angular/core';
import { AuthService } from '../auth-page/auth.service';
import { MainSidebarComponent } from '../main-sidebar/main-sidebar.component';
import { DetailSidebarComponent } from '../detail-sidebar/detail-sidebar.component';
import { FriendsComponent } from '../friends/friends.component';
import { FriendRequestsComponent } from '../friends/friend-requests/friend-requests.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainSidebarComponent, DetailSidebarComponent, FriendsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private authService : AuthService){

  }
  ngOnInit(){
  }
}
