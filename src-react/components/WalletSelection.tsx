import type { WalletType } from '../models/game-slot.model';
import './WalletSelection.scss';

interface WalletSelectionProps {
  onWalletChange: (wallet: WalletType) => void;
  onClose: () => void;
}

export default function WalletSelection({ onWalletChange, onClose }: WalletSelectionProps) {
  return (
    <div className="wallets">
      <div className="wallet-container d-flex flex-column gap-2" style={{ padding: 12 }}>
        <button
          className="close-button border-0 p-0 rounded-circle bg-transparent"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
          <img className="w-100" src="/assets/images/x-icon.png" alt="Close" />
        </button>

        <div
          className="promotion-wallet p-3"
          style={{ marginTop: 1 }}
          onClick={() => onWalletChange('promo')}
        >
          <div role="button" className="w-100 h-100 d-flex flex-column align-items-center">
            <div className="flex-grow-1" style={{ minHeight: 0 }}>
              <img alt="promotion-wallet" src="/assets/wallet/promotion-wallet.png" />
            </div>
            <div className="flex-shrink-0">
              <img alt="promotion-wallet" src="/assets/wallet/promotion-wallet-text.png" />
            </div>
          </div>
        </div>

        <div
          role="button"
          className="primary-wallet d-flex flex-column p-3"
          onClick={() => onWalletChange('main')}
        >
          <div className="flex-grow-1" style={{ minHeight: 0 }}>
            <img alt="primary-wallet" src="/assets/wallet/primary-wallet.png" />
          </div>
          <div className="flex-shrink-0">
            <img
              style={{ maxWidth: '100%', height: 20, width: 'auto' }}
              alt="primary-wallet"
              src="/assets/wallet/primary-wallet-text.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
