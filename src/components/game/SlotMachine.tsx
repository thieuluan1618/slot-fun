import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Reels from './Reels';
import type { ReelsHandle } from './Reels';
import type { UserBalance, WalletType } from '../../models/game-slot.model';
import '../overlays/FaqModal.scss';
import './SlotMachine.scss';

const WinConditions = lazy(() => import('./WinConditions'));

interface SlotMachineProps {
  userBalance: UserBalance | null;
  currentWallet: WalletType;
  totalWin: number;
  onLoadingMessage?: (msg: string) => void;
  onLoadingDone?: () => void;
}

const WIN_RATIOS = [150, 100, 90, 80, 70, 60, 50, 0];
const CHIP_VALUES = [10, 20, 50, 100, 250, 500];

const PAYTABLE = [
  { code: 'PHA', name: 'Pharaoh', mult: '×500', bg: 'oklch(46% 0.16 78)', border: 'oklch(65% 0.14 82)', color: 'var(--gold-light)' },
  { code: 'ANU', name: 'Anubis', mult: '×250', bg: 'oklch(24% 0.11 294)', border: 'oklch(58% 0.12 280)', color: 'oklch(72% 0.10 280)' },
  { code: 'EYE', name: 'Eye of Ra', mult: '×100', bg: 'oklch(44% 0.16 61)', border: 'oklch(65% 0.16 66)', color: 'oklch(88% 0.10 70)' },
  { code: 'SCR', name: 'Scarab', mult: '×50', bg: 'oklch(28% 0.13 255)', border: 'oklch(52% 0.13 254)', color: 'oklch(68% 0.10 254)' },
  { code: 'LTU', name: 'Lotus', mult: '×25', bg: 'oklch(32% 0.11 190)', border: 'oklch(54% 0.12 190)', color: 'oklch(66% 0.10 190)' },
];

function formatMoney(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatTime(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export default function SlotMachine({
  totalWin,
  onLoadingMessage,
  onLoadingDone,
}: SlotMachineProps) {
  const reelsRef = useRef<ReelsHandle>(null);
  const reelInnerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [selectedChipValue, setSelectedChipValue] = useState(0);
  const [totalBet, setTotalBet] = useState(0);
  const [currentWin, setCurrentWin] = useState(0);
  const [credit, setCredit] = useState(0);
  const [history, setHistory] = useState<boolean[]>([]);
  const [reelDimensions, setReelDimensions] = useState({ width: 644, height: 404 });
  const [now, setNow] = useState(() => new Date());
  const [isReal, setIsReal] = useState(true);
  const pendingResultRef = useRef<{ winRatio: number; reward: number }>({ winRatio: 0, reward: 0 });
  const knobAudio = useRef(new Audio('/assets/audio/knob-pull.mp3'));

  // Measure reel inner container once mounted.
  useLayoutEffect(() => {
    if (reelInnerRef.current) {
      setReelDimensions({
        width: reelInnerRef.current.clientWidth,
        height: reelInnerRef.current.clientHeight,
      });
    }
  }, []);

  // Scale 1280x720 stage to fit viewport (centered via flex on host).
  useEffect(() => {
    function scaleStage() {
      const stage = stageRef.current;
      if (!stage) return;
      const sx = window.innerWidth / 1280;
      const sy = window.innerHeight / 720;
      const s = Math.min(sx, sy);
      stage.style.transform = `scale(${s})`;
    }
    scaleStage();
    window.addEventListener('resize', scaleStage);
    return () => window.removeEventListener('resize', scaleStage);
  }, []);

  useEffect(() => {
    setCredit(totalWin);
  }, [totalWin]);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  function clearBet() {
    setTotalBet(0);
    setSelectedChipValue(0);
  }

  function maxBet() {
    setTotalBet(credit);
    setSelectedChipValue(0);
  }

  function onAddBet() {
    if (selectedChipValue <= 0) return;
    setTotalBet((prev) => prev + selectedChipValue);
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
    knobAudio.current.play().catch(() => undefined);
    return true;
  }

  function onSpinComplete() {
    const { reward } = pendingResultRef.current;
    const isWin = reward > 0;
    setCurrentWin(reward);
    if (isWin) {
      setCredit((prev) => prev + reward);
    }
    setHistory((prev) => [isWin, ...prev].slice(0, 12));
    setTotalBet(0);
  }

  const onSpinClick = useCallback(() => {
    if (reelsRef.current?.running) return;
    knobPulled();
  }, [credit, totalBet]);

  // Decorative jackpot values derived from credit so they react to balance.
  const baseJackpot = Math.max(credit, 50_000);
  const miniJackpot = baseJackpot * 0.628;
  const majorJackpot = baseJackpot * 2.094;
  const megaJackpot = baseJackpot * 6.282;

  return (
    <div className="sands-stage-host">
      <div className="sands-stage" ref={stageRef}>
        <div className="bg-glow" />

        {/* Floating dust particles */}
        <div className="pt" style={{ left: '18%', bottom: '105px', ['--d' as string]: '7s', ['--dl' as string]: '0s', ['--dx' as string]: '12px' } as React.CSSProperties} />
        <div className="pt" style={{ left: '33%', bottom: '108px', ['--d' as string]: '9s', ['--dl' as string]: '1.8s', ['--dx' as string]: '-9px', opacity: 0.6 } as React.CSSProperties} />
        <div className="pt" style={{ left: '50%', bottom: '106px', ['--d' as string]: '8s', ['--dl' as string]: '0.6s', ['--dx' as string]: '7px' } as React.CSSProperties} />
        <div className="pt" style={{ left: '66%', bottom: '110px', ['--d' as string]: '10s', ['--dl' as string]: '2.4s', ['--dx' as string]: '-11px', opacity: 0.5 } as React.CSSProperties} />
        <div className="pt" style={{ left: '82%', bottom: '104px', ['--d' as string]: '7.5s', ['--dl' as string]: '3.2s', ['--dx' as string]: '9px' } as React.CSSProperties} />
        <div className="pt" style={{ left: '44%', bottom: '107px', ['--d' as string]: '8.5s', ['--dl' as string]: '1.1s', ['--dx' as string]: '-5px', opacity: 0.7 } as React.CSSProperties} />
        <div className="pt" style={{ left: '12%', bottom: '109px', ['--d' as string]: '11s', ['--dl' as string]: '4s', ['--dx' as string]: '6px', opacity: 0.4 } as React.CSSProperties} />
        <div className="pt" style={{ left: '74%', bottom: '106px', ['--d' as string]: '6.5s', ['--dl' as string]: '2s', ['--dx' as string]: '-8px', opacity: 0.6 } as React.CSSProperties} />

        <div className="geo-strip top" />
        <div className="geo-strip bottom" />

        {/* ===== TOP ===== */}
        <div className="top-section">
          <div className="jackpot-group">
            <div className="jackpot-item">
              <div className="jackpot-label">Mini Jackpot</div>
              <div className="jackpot-value">{formatMoney(miniJackpot)}</div>
            </div>
            <div className="jackpot-item">
              <div className="jackpot-label">Major Jackpot</div>
              <div className="jackpot-value">{formatMoney(majorJackpot)}</div>
            </div>
          </div>

          <div className="title-center">
            <div className="game-title">Sands of Eternity</div>
            <div className="game-subtitle">Uncover the Secrets of the Pharaohs</div>
          </div>

          <div className="jackpot-group right">
            <div className="jackpot-item mega">
              <div className="jackpot-label">Mega Jackpot</div>
              <div className="jackpot-value">{formatMoney(megaJackpot)}</div>
            </div>
          </div>

          <div className="top-controls">
            <button type="button" className="top-btn" aria-label="Favorite">★</button>
            <FaqLauncher />
            <button type="button" className="top-btn close-btn" aria-label="Close">✕</button>
          </div>
        </div>

        {/* ===== MAIN ===== */}
        <div className="main-layout">
          {/* LEFT SIDEBAR */}
          <div className="left-sidebar">
            <div className="sidebar-panel">
              <div className="panel-title">Paytable</div>
              <div className="paytable-rows">
                {PAYTABLE.map((p) => (
                  <div key={p.code} className="paytable-row">
                    <div
                      className="pay-chip"
                      style={{ background: p.bg, border: `1px solid ${p.border}` }}
                    >
                      <span style={{ color: p.color, fontSize: 6 }}>{p.code}</span>
                    </div>
                    <div className="pay-info">
                      <span className="pay-name">{p.name}</span>
                      <span className="pay-mult">{p.mult}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="divider-line">
                <div className="dl" />
                <span>Royals</span>
                <div className="dl" />
              </div>
              <div className="royals-row">
                <span className="royal-letter" style={{ color: 'var(--gold)' }}>A</span>
                <span className="royal-letter" style={{ color: 'var(--gold-dim)' }}>K</span>
                <span className="royal-letter" style={{ color: 'oklch(56% 0.07 78)' }}>Q</span>
                <span className="royal-letter" style={{ color: 'oklch(50% 0.06 76)' }}>J</span>
                <span className="royal-letter" style={{ color: 'oklch(44% 0.05 74)' }}>10</span>
              </div>
            </div>

            <div className="sidebar-panel" style={{ flex: 1 }}>
              <div className="panel-title">History</div>
              {history.length === 0 ? (
                <div className="history-empty">No spins yet</div>
              ) : (
                <div className="history-list">
                  {history.map((win, i) => (
                    <img
                      key={i}
                      alt={win ? 'win' : 'loss'}
                      src={win ? '/assets/images/white-circle.png' : '/assets/images/black-circle.png'}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* REEL AREA */}
          <div className="reel-area">
            <div className="reel-outer">
              <div className="fc tl" />
              <div className="fc tr" />
              <div className="fc bl" />
              <div className="fc br" />
              <div className="frame-accent-top" />
              <div className="frame-accent-bottom" />
              <div className="reel-inner" ref={reelInnerRef}>
                <Reels
                  ref={reelsRef}
                  width={reelDimensions.width}
                  height={reelDimensions.height}
                  onLoadingMessage={onLoadingMessage}
                  onLoadingDone={onLoadingDone}
                  onSpinComplete={onSpinComplete}
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="right-sidebar">
            <div className="sidebar-panel num-control">
              <div className="ctrl-title">Bet Per Chip</div>
              <div className="ctrl-value">{selectedChipValue || '—'}</div>
              <div className="chips-grid">
                {CHIP_VALUES.map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={`chip-btn${selectedChipValue === v ? ' selected' : ''}`}
                    onClick={() => setSelectedChipValue(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-panel" style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <button type="button" className="action-btn gold" onClick={onAddBet} disabled={selectedChipValue <= 0}>
                Add Bet
              </button>
              <button type="button" className="action-btn teal" onClick={maxBet}>Max Bet</button>
              <button type="button" className="action-btn crimson" onClick={clearBet}>Clear</button>
            </div>

            <div className="sidebar-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="panel-title">Win Lines</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 3, marginTop: 6 }}>
                {[
                  'oklch(65% 0.15 82 / 0.7)', 'oklch(58% 0.13 190 / 0.7)', 'oklch(50% 0.14 254 / 0.7)',
                  'oklch(55% 0.15 28 / 0.7)', 'oklch(58% 0.14 148 / 0.7)', 'oklch(62% 0.15 62 / 0.7)',
                  'oklch(50% 0.12 310 / 0.7)', 'oklch(54% 0.13 126 / 0.7)', 'oklch(52% 0.13 222 / 0.7)',
                  'oklch(65% 0.15 82 / 0.35)',
                ].map((bg, i) => (
                  <div key={i} style={{ height: 4, borderRadius: 2, background: bg }} />
                ))}
              </div>
              <div
                style={{
                  fontSize: 7.5,
                  letterSpacing: '0.12em',
                  color: 'var(--text-dim)',
                  marginTop: 5,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                3 Reels Active
              </div>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM HUD ===== */}
        <div className="bottom-hud">
          <div className="hud-icons">
            <button type="button" className="hud-icon-btn" aria-label="Menu">☰</button>
            <button type="button" className="hud-icon-btn" aria-label="Sound">♪</button>
          </div>

          <div className="hud-div" />

          <div className="hud-block">
            <div className="hud-label">Credits</div>
            <div className="hud-value">{formatMoney(credit)}</div>
          </div>

          <div className="hud-div" />

          <button
            type="button"
            className="hud-toggle"
            onClick={() => setIsReal((v) => !v)}
            aria-label="Real / Demo toggle"
          >
            <span className="toggle-txt" style={{ opacity: isReal ? 1 : 0.4 }}>REAL</span>
            <div className={`toggle-pill${isReal ? ' on' : ''}`} />
            <span className="toggle-txt" style={{ opacity: !isReal ? 1 : 0.4 }}>DEMO</span>
          </button>

          <div className="hud-div" />

          <div className="hud-block">
            <div className="hud-label">Total Bet</div>
            <div className="hud-value gold">{formatMoney(totalBet)}</div>
          </div>

          <div className="hud-spacer" />

          <button
            type="button"
            className="spin-btn"
            onClick={onSpinClick}
            disabled={totalBet <= 0 || totalBet > credit}
          >
            <div className="spin-icon">↺</div>
            SPIN
          </button>

          <div className="hud-spacer" />

          <div className="hud-block">
            <div className="hud-label">Last Win</div>
            <div className={`hud-value ${currentWin > 0 ? 'teal' : ''}`}>
              {currentWin > 0 ? formatMoney(currentWin) : '—'}
            </div>
          </div>

          <div className="hud-div" />

          <div className="hud-meta">
            <div className="hud-meta-val">USD</div>
            <div className="hud-meta-val">{formatTime(now)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** FAQ launcher styled to match the top-btn aesthetic. */
function FaqLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="top-btn"
        style={{ fontSize: 16, fontWeight: 700 }}
        onClick={() => setIsOpen(true)}
        aria-label="Help"
      >
        ?
      </button>
      {isOpen && (
        <div className="faq-modal-backdrop" onClick={() => setIsOpen(false)}>
          <div className="faq-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="exit-button absolute right-4 top-4 rounded-full border-0 p-0"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            />
            <div className="mt-3 flex w-full flex-col items-center text-white">
              <h3>Win Conditions</h3>
              <Suspense fallback={null}>
                <WinConditions />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
