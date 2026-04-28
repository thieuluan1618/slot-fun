import { io, Socket } from "socket.io-client";
import { environment } from "../config/environment";
import { authService } from "./auth.service";

class SocketService {
  private socket: Socket | null = null;

  connect(): void {
    if (environment.mockApi) return;
    const token = authService.getToken();
    this.socket = io(environment.socketUrl, {
      transports: ["websocket"],
      extraHeaders: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
