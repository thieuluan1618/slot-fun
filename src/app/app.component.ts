import { Component, ViewChild } from '@angular/core';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'slot-fun';

  constructor(private readonly authService: AuthService) {
    this.authService
      .login()
      .subscribe(() => this.authService.getAsset().subscribe());
  }
}
