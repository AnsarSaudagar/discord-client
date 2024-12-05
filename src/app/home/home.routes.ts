import { Routes } from '@angular/router';
import { FriendsComponent } from '../friends/friends.component';
import { FRIEND_ROUTES } from '../friends/friends.routes';
export const HOME_ROUTES: Routes = [
  { path: 'friends', component: FriendsComponent, children: FRIEND_ROUTES},
  { path: '', redirectTo: 'friends' ,pathMatch: "full"},
];
