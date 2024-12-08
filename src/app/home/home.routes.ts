import { Routes } from '@angular/router';
import { FriendsComponent } from '../friends/friends.component';
import { FRIEND_ROUTES } from '../friends/friends.routes';
import { ChatComponent } from '../chat/chat.component';
export const HOME_ROUTES: Routes = [
  { path: 'friends', component: FriendsComponent, children: FRIEND_ROUTES},
  { path: '', redirectTo: 'friends' ,pathMatch: "full"},
  {path: "chat/:chat_id/:other_user_id", component: ChatComponent},
  { path: '**', redirectTo: 'friends' ,pathMatch: "full"},
];
