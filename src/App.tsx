import { useCallback, useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import SlotMachine from './components/game/SlotMachine';
import WalletSelection from './components/overlays/WalletSelection';
import LoadingOverlay from './components/overlays/LoadingOverlay';
import { authService } from './services/auth.service';
import { apiService } from './services/api.service';
import { socketService } from './services/socket.service';
import type { UserBalance, WalletType } from './models/game-slot.model';
import './App.scss';

export default function App() {
  const [showWallet, setShowWallet] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentWallet, setCurrentWallet] = useState<WalletType>('main');
  const [totalWin, setTotalWin] = useState(0);
  const [userBalance, setUserBalance] = useState<UserBalance | null>(null);

  useEffect(() => {
    async function init() {
      try {
        await authService.login();
        socketService.connect();

        const roomInfo = await apiService.joinRoom('main');
        setCurrentWallet(roomInfo.playMode as WalletType);
        setTotalWin(roomInfo.userBalance);

        const balance = await apiService.getUserBalance();
        setUserBalance(balance);
      } catch (err) {
        console.error('Init failed:', err);
      }
    }
    init();
  }, []);

  async function onWalletChange(wallet: WalletType) {
    await apiService.outRoom();
    const info = await apiService.joinRoom(wallet);
    setCurrentWallet(info.playMode as WalletType);
    setTotalWin(info.userBalance);
  }

  const onLoadingDone = useCallback(() => setLoading(false), []);

  return (
    <>
      <section className="slot-main-container">
        <div>
          <section>
            <SlotMachine
              userBalance={userBalance}
              currentWallet={currentWallet}
              totalWin={totalWin}
              onLoadingDone={onLoadingDone}
            />
          </section>

          {showWallet && (
            <div id="wallet-selection" className="slide-in">
              <WalletSelection
                onWalletChange={onWalletChange}
                onClose={() => setShowWallet(false)}
              />
            </div>
          )}
        </div>

        <button
          id="toggle-wallet-button"
          className="border-0 p-0 bg-transparent"
          onClick={() => setShowWallet((prev) => !prev)}
        >
          <img
            style={{ maxWidth: 100 }}
            className="w-full"
            src="/assets/images/cash-coin.png"
            alt="Toggle wallet"
          />
        </button>
      </section>

      <LoadingOverlay visible={loading} />
      <Analytics />
    </>
  );
}
