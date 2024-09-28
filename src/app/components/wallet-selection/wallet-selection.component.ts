import { Component, EventEmitter, Output } from '@angular/core';
import { CloseButtonComponent } from '../close-button/close-button.component';
import { WalletType } from '../../models/game-slot.model';

@Component({
  selector: 'app-wallet-selection',
  standalone: true,
  imports: [CloseButtonComponent],
  templateUrl: './wallet-selection.component.html',
  styleUrl: './wallet-selection.component.scss',
})
export class WalletSelectionComponent {
  @Output() walletChanged = new EventEmitter<WalletType>();
  @Output() closeWallet = new EventEmitter<void>();

  selectedWallet = 'main';

  selectWallet(wallet: WalletType) {
    this.selectedWallet = wallet;
    this.walletChanged.emit(wallet);
  }

  onCloseWallet() {
    this.closeWallet.emit();
  }
}
