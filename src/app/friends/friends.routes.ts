import { Routes } from '@angular/router';
import { FriendSearchComponent } from './friend-search/friend-search.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';

export const FRIEND_ROUTES: Routes = [
  { path: '', component: FriendRequestsComponent },
  { path: 'add', component: FriendSearchComponent },
  { path: '**', redirectTo: '' },
];
