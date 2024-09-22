import { Component, ViewChild } from '@angular/core';

import { AuthService } from './services/auth.service';
import { log, SignalrService } from './services/signalr.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'slot-fun';

  constructor(
    private readonly authService: AuthService,
    private readonly signalrService: SignalrService,
    private readonly apiService: ApiService,
  ) {}
}
