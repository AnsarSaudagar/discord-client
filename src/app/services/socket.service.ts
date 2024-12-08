import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private _socket: any;

  startServer(){
    this._socket = io('http://localhost:3001', {
      query: { userId: localStorage.getItem("id") }, 
    });
  }

  get socket(){
    return this._socket;
  }
}
