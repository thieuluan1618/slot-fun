import type { WalletType } from '../../models/game-slot.model';
import './WalletSelection.scss';

interface WalletSelectionProps {
  onWalletChange: (wallet: WalletType) => void;
  onClose: () => void;
}

export default function WalletSelection({ onWalletChange, onClose }: WalletSelectionProps) {
  return (
    <div className="wallets">
      <div className="wallet-container flex flex-col gap-2" style={{ padding: 12 }}>
        <button
          className="close-button rounded-full border-0 bg-transparent p-0"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
          <img className="w-full" src="/assets/images/x-icon.png" alt="Close" />
        </button>

        <div
          className="promotion-wallet p-3"
          style={{ marginTop: 1 }}
          onClick={() => onWalletChange('promo')}
        >
          <div role="button" className="flex h-full w-full flex-col items-center">
            <div className="min-h-0 grow">
              <img alt="promotion-wallet" src="/assets/wallet/promotion-wallet.png" />
            </div>
            <div className="shrink-0">
              <img alt="promotion-wallet" src="/assets/wallet/promotion-wallet-text.png" />
            </div>
          </div>
        </div>

        <div
          role="button"
          className="primary-wallet flex flex-col p-3"
          onClick={() => onWalletChange('main')}
        >
          <div className="min-h-0 grow">
            <img alt="primary-wallet" src="/assets/wallet/primary-wallet.png" />
          </div>
          <div className="shrink-0">
            <img
              className="h-5 max-w-full w-auto"
              alt="primary-wallet"
              src="/assets/wallet/primary-wallet-text.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
