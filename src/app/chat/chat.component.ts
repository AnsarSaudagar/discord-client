import { Component, OnInit } from '@angular/core';
import { LayoutWrapperComponent } from '../wrappers/layout-wrapper/layout-wrapper.component';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [LayoutWrapperComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  host: {
    class: 'flex-[1] relative',
  },
})
export class ChatComponent implements OnInit {
  friendData!: User;
  message_id!: number;
  friend_id!: number;
  loggedData!: User | null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (paramsMap: any) => {
        this.message_id = +paramsMap.params.chat_id;
        this.friend_id = +paramsMap.params.other_user_id;

        this.userService
          .getUserData(+paramsMap.params.other_user_id)
          .subscribe({
            next: (user_data: User) => {
              this.friendData = user_data;
            },
          });
      },
    });
  }

  getFriendData() {}

  onEnter() {}
}
