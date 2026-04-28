import { useCallback, useRef, useState } from 'react';
import Reels, { type ReelsHandle } from './Reels';
import SpinButton from './SpinButton';
import ImageButton from './ImageButton';
import Chip from './Chip';
import GameHistory from './GameHistory';
import MoneyDisplay from './MoneyDisplay';
import FaqModal from './FaqModal';
import type { UserBalance } from '../models/game-slot.model';
import './SlotMachine.scss';

interface SlotMachineProps {
  userBalance: UserBalance | null;
  currentWallet: string;
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
  const wheelWrapperRef = useRef<HTMLDivElement>(null);

  const [selectedChipValue, setSelectedChipValue] = useState(0);
  const [totalBet, setTotalBet] = useState(0);
  const [currentWin] = useState(0);
  const [playerScore, setPlayerScore] = useState(10);
  const [history] = useState<boolean[]>(() =>
    Array.from({ length: 10 }, () => Math.random() < 0.5),
  );

  const [reelDimensions, setReelDimensions] = useState({ width: 484, height: 254 });

  const wheelRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setReelDimensions({
        width: node.clientWidth - 16,
        height: node.clientHeight - 16,
      });
      (wheelWrapperRef as any).current = node;
    }
  }, []);

  function getCurrentUserBalance(): number {
    if (!userBalance || !currentWallet) return 0;
    return (userBalance as any)[currentWallet]?.VND ?? 0;
  }

  function clearBet() {
    setTotalBet(0);
    setSelectedChipValue(0);
  }

  function maxBet() {
    setTotalBet(getCurrentUserBalance());
    setSelectedChipValue(0);
  }

  function onBet() {
    setTotalBet((prev) => prev + selectedChipValue);
    setSelectedChipValue(0);
  }

  function knobPulled() {
    reelsRef.current?.startPlay(150);
    if (playerScore > 0) {
      playAudio('/assets/audio/knob-pull.mp3');
      setPlayerScore((prev) => prev - 1);
    }
  }

  function playAudio(src: string) {
    const audio = new Audio();
    audio.src = src;
    audio.load();
    audio.play();
  }

  const chipValues = [10, 20, 50, 100, 250, 500];

  return (
    <div className="slot-machine">
      <img className="light" id="left-light" src="/assets/images/left-light.png" alt="left light" />
      <img className="light" id="right-light" src="/assets/images/right-light.png" alt="right light" />

      <div id="your-luck-here">
        <img className="w-100" src="/assets/images/your-luck-here.png" alt="your luck here" />
        <img className="position-absolute text-bg" src="/assets/images/your-luck-here-bg.png" alt="bg" />
      </div>

      <div ref={wheelRef} className="slot-wheel-wrapper">
        <Reels
          ref={reelsRef}
          width={reelDimensions.width}
          height={reelDimensions.height}
          onLoadingMessage={onLoadingMessage}
          onLoadingDone={onLoadingDone}
        />
      </div>

      <FaqModal className="faq-button-pos" />

      <div id="bet-button">
        <ImageButton
          defaultImage="/assets/buttons/bet-mouse-up.png"
          pressedImage="/assets/buttons/bet-mouse-down.png"
          onClick={onBet}
          label={{ src: '/assets/images/bet-label.png', alt: 'bet label' }}
        />
      </div>

      <div id="spin-button">
        <SpinButton onClick={() => !reelsRef.current?.running && knobPulled()} />
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
        <MoneyDisplay imgSrc="/assets/images/credit-label.png" value={totalWin} />
      </div>

      <div id="balance-number">
        <MoneyDisplay value={getCurrentUserBalance()} />
      </div>

      <div id="current-win-number" style={{ width: 138 }}>
        <MoneyDisplay imgSrc="/assets/images/win-label.png" value={currentWin} />
      </div>
    </div>
  );
}
