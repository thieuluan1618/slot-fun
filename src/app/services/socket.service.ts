import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {}

  connect(): void {
    this.socket = io('https://socket.slot.game.jackpot2024.win/slot', {
      transports: ['websocket'],
      extraHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        // Authorization: localStorage.getItem('access_token'),
      },
    });
  }

  // Example method to send a message
  sendMessage(event: string, message: any): void {
    this.socket.emit(event, message);
  }

  // Example method to listen for messages
  onMessage(event: string, callback: (data: any) => void): void {
    this.socket.on(event, callback);
  }

  // Disconnect the socket
  disconnect(): void {
    this.socket.disconnect();
  }
}
