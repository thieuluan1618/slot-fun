import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  connect(): void {
    this.socket = io('https://socket.slot.game.jackpot2024.win/slot', {
      transports: ['websocket'],
      extraHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }

  sendMessage(event: string, message: unknown): void {
    this.socket?.emit(event, message);
  }

  onMessage(event: string, callback: (data: unknown) => void): void {
    this.socket?.on(event, callback);
  }

  disconnect(): void {
    this.socket?.disconnect();
  }
}

export const socketService = new SocketService();
