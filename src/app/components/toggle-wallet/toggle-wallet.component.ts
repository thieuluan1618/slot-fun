import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-wallet',
  standalone: true,
  imports: [],
  templateUrl: './toggle-wallet.component.html',
  styleUrl: './toggle-wallet.component.scss',
})
export class ToggleWalletComponent {
  @Output() onclick = new EventEmitter<MouseEvent>();
}
