import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { DmSentRequest } from '../models/dm_sent_request.model';

@Injectable({
  providedIn: 'root',
})
export class DirectMessageService {
  private BASE_URL = environment.API_URL + 'dm/';
  private SENT_URL = this.BASE_URL + 'send';

  constructor(private http: HttpClient) {}

  sendChat(request_body: DmSentRequest) {
    return this.http.post(this.SENT_URL, request_body);
  }

  getInitiatedChats(){
    
  }
}
