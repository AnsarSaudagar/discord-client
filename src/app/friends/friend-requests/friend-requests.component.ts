import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../services/friend.service';
import { FriendRequestResponse } from '../../models/friend_request_response.model';
import { FriendSharingService } from '../../services/friend-sharing.service';
import { SocketService } from '../../services/socket.service';
import { JsonPipe } from '@angular/common';
import { DirectMessageService } from '../../services/direct-message.service';

@Component({
  selector: 'app-friend-requests',
  standalone: true,
  imports: [],
  templateUrl: './friend-requests.component.html',
  styleUrl: './friend-requests.component.css',
  host: {
    class: 'flex-[1]',
  },
})
export class FriendRequestsComponent implements OnInit {
  loggedId!: number;
  requestArr: any = [];

  requestType!: number;
  requestTypeStr!: string;

  constructor(
    private friendService: FriendService,
    private friendSharingService: FriendSharingService,
    private socketService: SocketService,
    private dmService: DirectMessageService
  ) {
    const id = localStorage.getItem('id');
    if (id) {
      this.loggedId = +id;
    }
  }

  ngOnInit(): void {
    this.friendService.getPendingRequests().subscribe();
    this.updateRequestData();
    this.onComingRequest();

    this.friendSharingService.friendTypeSubject.subscribe({
      next: (type) => {
        this.requestType = type;
        this.updateRequestData();
        Object.keys(this.friendSharingService.types).find((key) => {
          if (type === +this.friendSharingService.types[key]) {
            this.requestTypeStr = key;
            return;
          }
        });
      },
    });

    this.socketService.socket.on('accept_request', () => {
      this.friendService.getPendingRequests().subscribe();
    });
  }

  private onComingRequest() {
    this.socketService.socket.on('send_request', () => {
      this.friendService.getPendingRequests().subscribe();
    });
  }

  private updateRequestData() {
    this.friendService.pendingRequestSubject.subscribe({
      next: (req) => {
        this.requestArr = req.filter((d: FriendRequestResponse) => {
          return +d.status === this.requestType;
        });
      },
    });
  }

  onClickAccept(id: number, receiver_id: number) {
    this.friendService.acceptFriendRequest(id, receiver_id).subscribe({
      next: () => {
        this.friendService.getPendingRequests().subscribe();
        const messageText: string | null = null;
        this.dmService
          .sendChat({
            receiver_id: receiver_id,
            messageText: messageText,
          })
          .subscribe({
            next: (data) => {
              this.dmService.getInitiatedChats().subscribe();
            },
          });
      },
    });
  }
  onClickReject(id: number) {
    this.friendService.deleteFriendRequest(id).subscribe({
      next: () => {
        this.friendService.getPendingRequests().subscribe();
      },
    });
  }
  onClickChat(receiver_id: number) {}
}
