import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendSharingService {
  public PENDING = 0;
  public ACCEPTED = 1;
  public BLOCKED = 2;

  public types : any = {
    "PENDING" : this.PENDING,
    "ALL": this.ACCEPTED,
    "BLOCKED" : this.BLOCKED
  }

  public friendTypeSubject = new BehaviorSubject<number>(this.PENDING);

  constructor() { }

}
