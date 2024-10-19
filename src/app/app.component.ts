import { Component, ViewChild } from '@angular/core';

import { AuthService } from './services/auth.service';
import { log, SignalrService } from './services/signalr.service';
import { ApiService } from './services/api.service';
import { switchMap } from 'rxjs';
import { WalletType } from './models/game-slot.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'slot-fun';
  showWallet = false;

  constructor(
    private readonly authService: AuthService,
    private readonly signalrService: SignalrService,
    private readonly apiService: ApiService,
  ) {}

  onWalletChange(event: WalletType) {
    this.apiService
      .outRoom()
      .pipe(switchMap(() => this.apiService.joinRoom(event)))
      .subscribe();
  }
}
