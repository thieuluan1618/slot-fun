import {
  type Ref,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  Application,
  Assets,
  BlurFilter,
  ColorMatrixFilter,
  Container,
  Sprite,
  Texture,
  Ticker,
} from 'pixi.js';

interface BuzzConfig {
  duration: number;
  initialAmplitude: number;
  buzzFrequency: number;
  scaleMin: number;
  scaleMax: number;
  scalePulseSpeed: number;
  rotationMax: number;
  pattern: 'circular' | 'random' | 'directional' | 'wave';
  direction?: number;
  glowIntensity?: number;
  shakeIntensity?: number;
}

export interface ReelsHandle {
  startPlay: (result?: number) => void;
  running: boolean;
}

interface Reel {
  container: Container;
  symbols: Sprite[];
  position: number;
  previousPosition: number;
  blur: BlurFilter;
}

interface Tween {
  object: Reel;
  property: keyof Pick<Reel, 'position' | 'previousPosition'>;
  propertyBeginValue: number;
  target: number;
  easing: (t: number) => number;
  time: number;
  change: ((t: Tween) => void) | null;
  complete: ((t: Tween) => void) | null;
  start: number;
}

interface ReelsProps {
  ref?: Ref<ReelsHandle>;
  width: number;
  height: number;
  onLoadingMessage?: (msg: string) => void;
  onLoadingDone?: () => void;
  onSpinComplete?: () => void;
}

const REEL_SYMBOLS = [
  'Bell',
  'Scatter',
  'Seven',
  'Ankh',
  'Scarab',
  'EyeOfHorus',
  'Pharaoh',
  'Pyramid',
  'Wild',
];

const SYMBOL_FILES: Record<string, string> = {
  Bell: '/assets/symbols/Bell.png',
  Scatter: '/assets/symbols/Scatter.png',
  Seven: '/assets/symbols/7.png',
  Ankh: '/assets/symbols/Ankh.svg',
  Scarab: '/assets/symbols/Scarab.svg',
  EyeOfHorus: '/assets/symbols/EyeOfHorus.svg',
  Pharaoh: '/assets/symbols/Pharaoh.svg',
  Pyramid: '/assets/symbols/Pyramid.svg',
  Wild: '/assets/symbols/Wild.svg',
};

const NUM_REELS = 5;
const VISIBLE_ROWS = 4;
const REEL_GAP = 4;

const REEL_PATTERNS: number[][] = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8],
  [1, 3, 5, 7, 0, 2, 4, 6, 8],
  [2, 5, 8, 0, 3, 6, 1, 4, 7],
  [3, 7, 2, 6, 1, 5, 0, 8, 4],
  [4, 8, 3, 7, 2, 6, 1, 5, 0],
];

function repeatSymbol(name: string): string[] {
  return Array(NUM_REELS).fill(name);
}

function getSymbolsForWinRatio(winRatio: number): string[] {
  switch (winRatio) {
    case 150: return repeatSymbol('Bell');
    case 50:  return repeatSymbol('Scatter');
    case 45:  return repeatSymbol('Ankh');
    case 40:  return repeatSymbol('Scarab');
    case 35:  return repeatSymbol('EyeOfHorus');
    case 30:  return repeatSymbol('Pharaoh');
    case 25:  return repeatSymbol('Pyramid');
    case 20:  return repeatSymbol('Wild');
    case 0:   return repeatSymbol('Seven');
    default:  return [];
  }
}

function Reels({ ref, width, height, onLoadingMessage, onLoadingDone, onSpinComplete }: ReelsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<Application | null>(null);
    const reelsRef = useRef<Reel[]>([]);
    const tweeningRef = useRef<Tween[]>([]);
    const runningRef = useRef(false);
    const slotTexturesRef = useRef<Texture[]>([]);
    const symbolMapRef = useRef<Record<string, Sprite[]>>({});
    const buzzingSymbolsRef = useRef<WeakSet<Sprite>>(new WeakSet());
    const buzzTickerRef = useRef<((ticker: Ticker) => void) | null>(null);
    const reelWidthRef = useRef(0);
    const symbolSizeRef = useRef(0);

    useImperativeHandle(ref, () => ({
      startPlay: (result?: number) => startPlay(result),
      get running() {
        return runningRef.current;
      },
    }));

    useEffect(() => {
      let mounted = true;

      async function init() {
        if (!containerRef.current) return;

        onLoadingMessage?.('Loading game...');

        const app = new Application();
        const symbolPaths = REEL_SYMBOLS.map((name) => SYMBOL_FILES[name]);
        const [, assets] = await Promise.all([
          app.init({
            width,
            height,
            backgroundAlpha: 0,
            antialias: true,
          }),
          Assets.load([
            ...symbolPaths,
            '/assets/backgrounds/background-wheel.svg',
          ]),
        ]);

        if (!mounted) {
          app.destroy(true);
          return;
        }

        slotTexturesRef.current = REEL_SYMBOLS.map(
          (name) => assets[SYMBOL_FILES[name]] as Texture,
        );

        containerRef.current.appendChild(app.canvas);
        appRef.current = app;

        app.ticker.add(() => updateSlots());
        (globalThis as any).__PIXI_APP__ = app;

        createReels(app);

        if (!mounted) return;
        onLoadingDone?.();
      }

      init();

      return () => {
        mounted = false;
        appRef.current?.destroy(true);
        appRef.current = null;
        reelsRef.current = [];
        tweeningRef.current = [];
        slotTexturesRef.current = [];
        symbolMapRef.current = {};
      };
    }, []);

    function createReels(app: Application) {
      const reelWidth = Math.floor((app.screen.width - (NUM_REELS - 1) * REEL_GAP) / NUM_REELS);
      const symbolSize = Math.floor(app.screen.height / VISIBLE_ROWS);
      reelWidthRef.current = reelWidth;
      symbolSizeRef.current = symbolSize;

      const reelContainer = new Container();
      reelContainer.label = 'reel-container';
      const bgTexture = Texture.from('/assets/backgrounds/background-wheel.svg');
      const symbolMap: Record<string, Sprite[]> = {};

      for (let i = 0; i < NUM_REELS; i++) {
        const rc = new Container();
        const rcBg = new Sprite(bgTexture);

        rcBg.width = reelWidth;
        rcBg.height = app.screen.height;

        rc.x = i * (reelWidth + REEL_GAP);
        rc.y = 0;
        rcBg.x = 0;
        rcBg.y = 0;

        rc.addChild(rcBg);
        reelContainer.addChild(rc);

        const reel = {
          container: rc,
          symbols: [] as Sprite[],
          position: 0,
          previousPosition: 0,
          blur: new BlurFilter(),
        };
        reel.blur.strengthX = 0;
        reel.blur.strengthY = 0;
        rc.filters = [reel.blur];

        for (let j = 0; j < slotTexturesRef.current.length; j++) {
          const textureIndex =
            REEL_PATTERNS[i][j % REEL_PATTERNS[i].length];
          const symbol = new Sprite(slotTexturesRef.current[textureIndex]);

          if (!symbolMap[REEL_SYMBOLS[textureIndex]]) {
            symbolMap[REEL_SYMBOLS[textureIndex]] = [];
          }
          symbolMap[REEL_SYMBOLS[textureIndex]].push(symbol);

          symbol.label = REEL_SYMBOLS[textureIndex];
          symbol.anchor.set(0.5, 0.5);
          symbol.y = j * symbolSize + symbolSize / 2;
          symbol.scale.x = symbol.scale.y = Math.min(
            symbolSize / symbol.width,
            symbolSize / symbol.height,
          );
          symbol.x = reelWidth / 2;

          reel.symbols.push(symbol);
          rc.addChild(symbol);
        }
        reelsRef.current.push(reel);
      }

      symbolMapRef.current = symbolMap;
      reelContainer.y = 0;
      reelContainer.x = 0;
      app.stage.addChild(reelContainer);
    }

    function startPlay(result?: number) {
      if (runningRef.current) return;
      runningRef.current = true;

      if (buzzTickerRef.current && appRef.current) {
        appRef.current.ticker.remove(buzzTickerRef.current);
        buzzTickerRef.current = null;
      }

      const symbolSize = symbolSizeRef.current;
      const reelWidth = reelWidthRef.current;
      reelsRef.current.forEach((r) => {
        r.position = 0;
        r.previousPosition = 0;
        r.blur.strengthY = 0;
        for (let j = 0; j < r.symbols.length; j++) {
          const s = r.symbols[j];
          buzzingSymbolsRef.current.delete(s);
          s.filters = null;
          s.rotation = 0;
          s.alpha = 1;
          s.x = reelWidth / 2;
          s.y = j * symbolSize + symbolSize / 2;
        }
      });

      const targetSymbols = getSymbolsForWinRatio(result!);
      const randomRowOffset = Math.round(Math.random() * 2 - 1);
      const winningSymbol = targetSymbols.length > 0 ? targetSymbols[0] : null;

      for (let i = 0; i < reelsRef.current.length; i++) {
        const r = reelsRef.current[i];
        let targetIndex: number;

        if (targetSymbols.length > 0) {
          targetIndex = REEL_PATTERNS[i].indexOf(
            REEL_SYMBOLS.indexOf(targetSymbols[i]),
          );
        } else {
          do {
            targetIndex = Math.floor(
              Math.random() * REEL_PATTERNS[i].length,
            );
          } while (
            i > 0 &&
            REEL_SYMBOLS[REEL_PATTERNS[i][targetIndex]] ===
              REEL_SYMBOLS[
                REEL_PATTERNS[0][
                  r.position % REEL_PATTERNS[0].length
                ]
              ]
          );
        }

        const extra = Math.floor(Math.random() * 3);
        const fullRotations = 10;
        const reelLength = REEL_SYMBOLS.length;
        const weight = ((2 - targetIndex) % reelLength + reelLength) % reelLength;
        const target =
          r.position +
          reelLength * fullRotations +
          weight +
          randomRowOffset;

        const time = 5000 + i * 600 + extra * 600;

        tweenTo(
          r,
          'position',
          target,
          time,
          backout(0.4),
          null,
          i === reelsRef.current.length - 1
            ? () => reelsComplete(winningSymbol)
            : null,
        );
      }
    }

    function reelsComplete(symbolName: string | null) {
      runningRef.current = false;
      if (symbolName) {
        addBuzzEffectByName(symbolName);
      }
      onSpinComplete?.();
    }

    function updateSlots() {
      const symbolSize = symbolSizeRef.current;
      if (!symbolSize) return;

      for (let i = 0; i < reelsRef.current.length; i++) {
        const reel = reelsRef.current[i];
        reel.blur.strengthY =
          (reel.position - reel.previousPosition) * 8;
        reel.previousPosition = reel.position;

        for (let j = 0; j < reel.symbols.length; j++) {
          const symbol = reel.symbols[j];
          if (buzzingSymbolsRef.current.has(symbol)) continue;
          const prevy = symbol.y;
          symbol.y =
            ((reel.position + j) % reel.symbols.length) * symbolSize -
            symbolSize / 2;
          if (symbol.y < 0 && prevy > symbolSize) {
            symbol.y += reel.symbols.length * symbolSize;
          }
        }
      }

      const now = Date.now();
      const remove: Tween[] = [];

      for (let i = 0; i < tweeningRef.current.length; i++) {
        const t = tweeningRef.current[i];
        const phase = Math.min(1, (now - t.start) / t.time);
        t.object[t.property] = lerp(
          t.propertyBeginValue,
          t.target,
          t.easing(phase),
        );
        if (t.change) t.change(t);
        if (phase === 1) {
          t.object[t.property] = t.target;
          if (t.complete) t.complete(t);
          remove.push(t);
        }
      }
      for (const r of remove) {
        const idx = tweeningRef.current.indexOf(r);
        if (idx >= 0) tweeningRef.current.splice(idx, 1);
      }
    }

    function tweenTo(
      object: Reel,
      property: Tween['property'],
      target: number,
      time: number,
      easing: (t: number) => number,
      onchange: ((t: Tween) => void) | null,
      oncomplete: ((t: Tween) => void) | null,
    ) {
      const tween = {
        object,
        property,
        propertyBeginValue: object[property],
        target,
        easing,
        time,
        change: onchange,
        complete: oncomplete,
        start: Date.now(),
      };
      tweeningRef.current.push(tween);
      return tween;
    }

    function lerp(a1: number, a2: number, t: number) {
      return a1 * (1 - t) + a2 * t;
    }

    function backout(amount: number) {
      return (t: number) => --t * t * ((amount + 1) * t + amount) + 1;
    }

    function addBuzzEffectByName(
      symbolName: string,
      customConfig?: Partial<BuzzConfig>,
    ) {
      const app = appRef.current;
      if (!app) return;

      const defaultConfig: BuzzConfig = {
        duration: 1500,
        initialAmplitude: 5,
        buzzFrequency: 0.8,
        scaleMin: 0.95,
        scaleMax: 1.1,
        scalePulseSpeed: 0.15,
        rotationMax: 0.05,
        pattern: 'random',
        glowIntensity: 0.3,
        shakeIntensity: 0.6,
      };

      const config = { ...defaultConfig, ...customConfig };
      let elapsed = 0;

      const originalStates = new WeakMap<
        Sprite,
        { x: number; y: number; scale: number; rotation: number; alpha: number }
      >();

      const symbols = symbolMapRef.current[symbolName] || [];

      symbols.forEach((symbol) => {
        buzzingSymbolsRef.current.add(symbol);
        originalStates.set(symbol, {
          x: symbol.position.x,
          y: symbol.position.y,
          scale: symbol.scale.x,
          rotation: symbol.rotation,
          alpha: symbol.alpha,
        });
        if (config.glowIntensity) {
          const blurFilter = new BlurFilter();
          const colorMatrix = new ColorMatrixFilter();
          colorMatrix.brightness(1.2, false);
          symbol.filters = [blurFilter, colorMatrix];
        }
      });

      const easings = {
        elastic: (t: number) => {
          const p = 0.3;
          return (
            Math.pow(2, -10 * t) *
              Math.sin(((t - p / 4) * (2 * Math.PI)) / p) +
            1
          );
        },
        back: (t: number) => {
          const c1 = 1.70158;
          const c3 = c1 + 1;
          return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
        },
      };

      const patterns: Record<
        string,
        (time: number, intensity: number) => { x: number; y: number }
      > = {
        circular: (time, intensity) => ({
          x: Math.cos(time * config.buzzFrequency) * intensity,
          y: Math.sin(time * config.buzzFrequency) * intensity,
        }),
        random: (_time, intensity) => ({
          x: (Math.random() - 0.5) * intensity * 2,
          y: (Math.random() - 0.5) * intensity * 2,
        }),
        directional: (time, intensity) => {
          const angle = config.direction || 0;
          return {
            x:
              Math.cos(angle) *
              Math.sin(time * config.buzzFrequency) *
              intensity,
            y:
              Math.sin(angle) *
              Math.sin(time * config.buzzFrequency) *
              intensity,
          };
        },
        wave: (time, intensity) => ({
          x: Math.sin(time * config.buzzFrequency) * intensity,
          y:
            Math.cos(time * config.buzzFrequency * 2) * intensity * 0.5,
        }),
      };

      const animate = (ticker: Ticker) => {
        elapsed += ticker.deltaTime;
        const progress = Math.min(elapsed / config.duration, 1);
        const inverseProgress = 1 - progress;

        symbols.forEach((symbol) => {
          const orig = originalStates.get(symbol)!;
          const buzzIntensity =
            config.initialAmplitude *
            config.shakeIntensity! *
            (1 - easings.elastic(progress));
          const offset = patterns[config.pattern](elapsed, buzzIntensity);

          symbol.position.x = orig.x + offset.x;
          symbol.position.y = orig.y + offset.y;

          const scaleRange = config.scaleMax - config.scaleMin;
          const baseScale =
            config.scaleMin + scaleRange * (1 - easings.back(progress));
          const scalePulse =
            Math.sin(elapsed * config.scalePulseSpeed) *
            0.03 *
            inverseProgress;
          const scaleWobble =
            Math.sin(elapsed * 0.3) * 0.02 * inverseProgress;
          symbol.scale.set(orig.scale * (baseScale + scalePulse + scaleWobble));

          const rotationShake =
            (Math.random() - 0.5) * config.rotationMax * inverseProgress;
          const rotationWave =
            Math.sin(elapsed * 0.2) *
            config.rotationMax *
            0.5 *
            inverseProgress;
          symbol.rotation = rotationShake + rotationWave;

          symbol.alpha = 0.9 + Math.sin(elapsed * 0.2) * 0.1;

          if (
            config.glowIntensity &&
            symbol.filters?.length
          ) {
            const blurFilter = symbol.filters[0] as BlurFilter;
            blurFilter.strength =
              Math.sin(elapsed * 0.1) *
              2 *
              config.glowIntensity *
              inverseProgress;
            const colorMatrix = symbol.filters[1] as ColorMatrixFilter;
            colorMatrix.brightness(
              1 +
                Math.sin(elapsed * 0.15) *
                  0.2 *
                  config.glowIntensity *
                  inverseProgress,
              false,
            );
          }
        });

        if (elapsed >= config.duration) {
          app.ticker.remove(animate);
          buzzTickerRef.current = null;
          symbols.forEach((symbol) => {
            const orig = originalStates.get(symbol)!;
            symbol.position.x = orig.x;
            symbol.position.y = orig.y;
            symbol.scale.set(orig.scale);
            symbol.rotation = orig.rotation;
            symbol.alpha = orig.alpha;
            symbol.filters = null;
            buzzingSymbolsRef.current.delete(symbol);
          });
        }
      };

      buzzTickerRef.current = animate;
      app.ticker.add(animate);
    }

  return <div ref={containerRef} />;
}

export default Reels;
