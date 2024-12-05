import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../services/friend.service';
import { FriendRequestResponse } from '../../models/friend_request_response.model';

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
  loggedId !: number;
  requestArr : any= [];
  
  constructor(private friendService: FriendService) {
    const id = localStorage.getItem("id");
    if(id){
      this.loggedId = +id;
    }
    
  }

  ngOnInit(): void {
    this.friendService.getPendingRequests().subscribe();

    this.friendService.pendingRequestSubject.subscribe({
      next: (req) => {
        
        this.requestArr = req.filter((d : FriendRequestResponse) =>{
          return +d.status === 0;
        });
      },
    });
  }

  onClickAccept(id : number){
    this.friendService.acceptFriendRequest(id).subscribe({
      next: () => {
        this.friendService.getPendingRequests().subscribe();
      }
    })
  }
  onClickReject(id : number){
    this.friendService.deleteFriendRequest(id).subscribe({
      next: () => {
        this.friendService.getPendingRequests().subscribe();
      }
    })
  }
}
