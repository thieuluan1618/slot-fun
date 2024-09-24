import { Component, EventEmitter, Output } from '@angular/core';
import { CloseButtonComponent } from '../close-button/close-button.component';

@Component({
  selector: 'app-wallet-selection',
  standalone: true,
  imports: [CloseButtonComponent],
  templateUrl: './wallet-selection.component.html',
  styleUrl: './wallet-selection.component.scss',
})
export class WalletSelectionComponent {
  selectedWallet = 'main';
}
