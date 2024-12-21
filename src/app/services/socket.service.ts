import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private _socket: any;
  private SOCKET_URL = environment.SOCKET_URL;

  startServer(){
    // this._socket = io(this.SOCKET_URL, {
    //   query: { userId: localStorage.getItem("id") }, 
    // });
  }

  get socket(){
    return this._socket;
  }
}
