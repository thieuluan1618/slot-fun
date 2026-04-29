import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import Reels from './Reels';
import SpinButton from '../controls/SpinButton';
import ImageButton from '../controls/ImageButton';
import Chip from '../controls/Chip';
import GameHistory from './GameHistory';
import MoneyDisplay from './MoneyDisplay';
const FaqModal = lazy(() => import('../overlays/FaqModal'));
import type { ReelsHandle } from './Reels';
import type { UserBalance, WalletType } from '../../models/game-slot.model';
import './SlotMachine.scss';

interface SlotMachineProps {
  userBalance: UserBalance | null;
  currentWallet: WalletType;
  totalWin: number;
  onLoadingMessage?: (msg: string) => void;
  onLoadingDone?: () => void;
}

export default function SlotMachine({
  userBalance,
  currentWallet,
  totalWin,
  onLoadingMessage,
  onLoadingDone,
}: SlotMachineProps) {
  const reelsRef = useRef<ReelsHandle>(null);

  const [selectedChipValue, setSelectedChipValue] = useState(0);
  const [totalBet, setTotalBet] = useState(0);
  const [currentWin, setCurrentWin] = useState(0);
  const [credit, setCredit] = useState(0);
  const [history, setHistory] = useState<boolean[]>([]);
  const pendingResultRef = useRef<{ winRatio: number; reward: number }>({ winRatio: 0, reward: 0 });

  const [reelDimensions, setReelDimensions] = useState({ width: 484, height: 254 });

  const wheelRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setReelDimensions({
        width: node.clientWidth - 16,
        height: node.clientHeight - 16,
      });
    }
  }, []);

  useEffect(() => {
    setCredit(totalWin);
  }, [totalWin]);

  const WIN_RATIOS = [150, 100, 90, 80, 70, 60, 50, 0];

  function clearBet() {
    setTotalBet(0);
    setSelectedChipValue(0);
  }

  function maxBet() {
    setTotalBet(credit);
    setSelectedChipValue(0);
  }

  function onBet() {
    setTotalBet((prev) => prev + selectedChipValue);
    setSelectedChipValue(0);
  }

  function knobPulled(): boolean {
    if (totalBet <= 0 || totalBet > credit) return false;

    setCredit((prev) => prev - totalBet);
    setCurrentWin(0);

    const isWin = Math.random() < 0.7;
    const winRatio = isWin ? WIN_RATIOS[Math.floor(Math.random() * WIN_RATIOS.length)] : -1;
    const reward = isWin ? totalBet * (winRatio === 0 ? 10 : winRatio / 100) : 0;

    pendingResultRef.current = { winRatio, reward };
    reelsRef.current?.startPlay(isWin ? winRatio : undefined);
    knobAudio.current.currentTime = 0;
    knobAudio.current.play();
    return true;
  }

  function onSpinComplete() {
    const { reward } = pendingResultRef.current;
    const isWin = reward > 0;
    setCurrentWin(reward);
    if (isWin) {
      setCredit((prev) => prev + reward);
    }
    setHistory((prev) => [isWin, ...prev].slice(0, 10));
    setTotalBet(0);
  }

  const knobAudio = useRef(new Audio('/assets/audio/knob-pull.mp3'));

  const chipValues = [10, 20, 50, 100, 250, 500];

  return (
    <div className="slot-machine">
      <img className="light" id="left-light" src="/assets/images/left-light.webp" alt="left light" />
      <img className="light" id="right-light" src="/assets/images/right-light.webp" alt="right light" />

      <div id="your-luck-here">
        <img className="w-full" src="/assets/images/your-luck-here.png" alt="your luck here" />
        <img className="absolute text-bg" src="/assets/images/your-luck-here-bg.png" alt="bg" />
      </div>

      <div ref={wheelRef} className="slot-wheel-wrapper">
        <Reels
          ref={reelsRef}
          width={reelDimensions.width}
          height={reelDimensions.height}
          onLoadingMessage={onLoadingMessage}
          onLoadingDone={onLoadingDone}
          onSpinComplete={onSpinComplete}
        />
      </div>

      <Suspense>
        <FaqModal className="faq-button-pos" />
      </Suspense>

      <div id="bet-button">
        <ImageButton
          defaultImage="/assets/buttons/bet-mouse-up.png"
          pressedImage="/assets/buttons/bet-mouse-down.png"
          onClick={onBet}
          label={{ src: '/assets/images/bet-label.png', alt: 'bet label' }}
        />
      </div>

      <div id="spin-button">
        <SpinButton onClick={() => reelsRef.current?.running ? false : knobPulled()} />
      </div>

      <div id="clear-button">
        <ImageButton
          defaultImage="/assets/buttons/clear-mouse-up.png"
          pressedImage="/assets/buttons/clear-mouse-down.png"
          onClick={clearBet}
          label={{ src: '/assets/images/clear-label.png', alt: 'clear label' }}
        />
      </div>

      <div id="max-bet-button">
        <ImageButton
          defaultImage="/assets/buttons/max-bet-mouse-up.png"
          pressedImage="/assets/buttons/max-bet-mouse-down.png"
          onClick={maxBet}
          label={{ src: '/assets/images/max-bet-label.png', alt: 'max bet label' }}
        />
      </div>

      {chipValues.map((val) => (
        <div key={val} id={`chip-${val}`}>
          <Chip
            value={val}
            selectedValue={selectedChipValue}
            onClick={() => setSelectedChipValue(val)}
          />
        </div>
      ))}

      <div id="game-history">
        <GameHistory history={history} />
      </div>

      <div id="total-bet-number" style={{ width: 190 }}>
        <MoneyDisplay imgSrc="/assets/images/total-bet-label.png" value={totalBet} />
      </div>

      <div id="total-win-number" style={{ width: 138 }}>
        <MoneyDisplay imgSrc="/assets/images/credit-label.png" value={credit} />
      </div>

      <div id="balance-number">
        <MoneyDisplay value={credit} />
      </div>

      <div id="current-win-number" style={{ width: 138 }}>
        <MoneyDisplay imgSrc="/assets/images/win-label.png" value={currentWin} />
      </div>
    </div>
  );
}
