import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';

export const log = (...arg: string[]) => {
  if (localStorage.getItem('iris-enable-debug')) {
    // eslint-disable-next-line no-console
    console.log('%c [SignalR Rating] ' + arg.join(' '), 'color: lightblue;');
  }
};

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  constructor() {
    // this.startConnection();
  }

  private hubConnection: signalR.HubConnection;

  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.socketUrl}`, {
        accessTokenFactory: () => localStorage.getItem('access_token'),
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        log('Connection established with SignalR hub');
        // this.setSignalrClientMethods();
        // this.isReady$.next(true);
        // this.connectionError$.next(false);
      })
      .catch((error) => {
        log('Connection error: ', error);
        // this.isReady$.next(false);
        // this.connectionError$.next(error || true);
      });

    // this.hubConnection.onreconnecting((info) => {
    //   this.isReady$.next(false);
    //   log('[Reconnecting]', info);
    // });
    this.hubConnection.onreconnected((info) => {
      // this.isReady$.next(true);
      log('[Reconnected]', info);
    });
    // this.hubConnection.onclose((info) => {
    //   this.isReady$.next(false);
    //   log('[Close]', info);
    // });
  }
}
