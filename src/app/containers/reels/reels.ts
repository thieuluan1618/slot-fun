import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  Application,
  Assets,
  BlurFilter,
  Container,
  Graphics,
  Sprite,
  TextStyle,
  Texture,
  Text,
} from 'pixi.js';

@Component({
  selector: 'app-reels',
  template: '<div #pixiContainer></div>',
  styleUrls: ['./reels.scss'],
  standalone: true,
})
export class Reels implements OnInit, AfterViewInit {
  @ViewChild('pixiContainer', { static: true }) pixiContainer!: ElementRef;

  private readonly REEL_SYMBOLS = [
    'Bell',
    'Cherries',
    'Grapes',
    'Lemon',
    'Melon',
    'Orange',
    'Scatter',
    'Seven',
  ];

  private readonly SYMBOL_WEIGHTS = [2, 1, 0, 7, 6, 5, 4, 3];

  private app!: Application;
  private readonly REEL_WIDTH = 160;
  private readonly SYMBOL_SIZE = 150;
  private reels: any[] = [];
  private running = false;
  private slotTextures: Texture[] = [];
  private tweening: any[] = [];

  private reelPatterns: number[][] = [
    [0, 1, 2, 3, 4, 5, 6, 7], // Reel 1 pattern
    // [0, 1, 2, 3, 4, 5, 6, 7], // Reel 1 pattern
    // [0, 1, 2, 3, 4, 5, 6, 7], // Reel 1 pattern
    [1, 3, 5, 7, 0, 2, 4, 6], // Reel 2 pattern
    [2, 5, 0, 7, 4, 1, 6, 3], // Reel 3 pattern
  ];

  constructor() {}

  ngOnInit() {}

  async ngAfterViewInit() {
    await this.initPixiApp();
    await this.loadAssets();
  }

  async initPixiApp() {
    this.app = new Application();

    await this.app.init({
      width: 500,
      height: 500,
      // backgroundColor: 0x000000, // Set to black
      backgroundAlpha: 0, // Make it fully transparent
      antialias: true, // Enable antialiasing for smoother graphics
    });

    this.pixiContainer.nativeElement.appendChild(this.app.canvas);

    // Set up the ticker
    this.app.ticker.add(() => {
      this.updateSlots();
    });

    globalThis.__PIXI_APP__ = this.app;
  }

  async loadAssets() {
    await Assets.load([
      '/assets/symbols/Bell.png',
      '/assets/symbols/Cherries.png',
      '/assets/symbols/Grape.png',
      '/assets/symbols/Lemon.png',
      '/assets/symbols/Melon.png',
      '/assets/symbols/Orange.png',
      '/assets/symbols/Scatter.png',
      '/assets/symbols/7.png',
    ]);

    this.onAssetsLoaded();
  }

  onAssetsLoaded() {
    this.slotTextures = [
      Texture.from('/assets/symbols/Bell.png'),
      Texture.from('/assets/symbols/Cherries.png'),
      Texture.from('/assets/symbols/Grape.png'),
      Texture.from('/assets/symbols/Lemon.png'),
      Texture.from('/assets/symbols/Melon.png'),
      Texture.from('/assets/symbols/Orange.png'),
      Texture.from('/assets/symbols/Scatter.png'),
      Texture.from('/assets/symbols/7.png'),
    ];

    this.createReels();
    // this.createCovers();
  }

  createReels() {
    const reelContainer = new Container();

    for (let i = 0; i < 3; i++) {
      const rc = new Container();

      // Positioning reel
      rc.x = i * this.REEL_WIDTH; // Ex: 0 - 50 - 100
      rc.y = 0;

      reelContainer.addChild(rc);

      const reel = {
        container: rc,
        symbols: [],
        position: 0,
        previousPosition: 0,
        blur: new BlurFilter(),
      };
      reel.blur.blurX = 0;
      reel.blur.blurY = 0;
      rc.filters = [reel.blur];

      // Build the symbols
      for (let j = 0; j < this.slotTextures.length; j++) {
        const textureIndex =
          this.reelPatterns[i][j % this.reelPatterns[i].length];
        const symbol = new Sprite(this.slotTextures[textureIndex]);

        symbol.y = j * this.SYMBOL_SIZE;
        symbol.scale.x = symbol.scale.y = Math.min(
          this.SYMBOL_SIZE / symbol.width,
          this.SYMBOL_SIZE / symbol.height,
        );
        symbol.x = Math.round((this.SYMBOL_SIZE - symbol.width) / 2);

        reel.symbols.push(symbol);

        rc.addChild(symbol);
      }
      this.reels.push(reel);
    }
    this.app.stage.addChild(reelContainer);

    const margin = (this.app.screen.height - this.SYMBOL_SIZE * 3) / 2;
    reelContainer.y = margin;
    reelContainer.x = Math.round(this.app.screen.width - this.REEL_WIDTH * 3);
  }

  createCovers() {
    const margin = (this.app.screen.height - this.SYMBOL_SIZE * 3) / 2;

    const bottom = new Container();
    const style = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      stroke: '#4a1850',
      dropShadow: true,
      wordWrap: true,
      wordWrapWidth: 440,
    });

    const playText = new Text('Spin the wheels!', style);
    playText.x = Math.round((this.app.screen.width - playText.width) / 2);
    playText.y =
      this.SYMBOL_SIZE * 3 +
      margin +
      Math.round((margin - playText.height) / 2);
    bottom.addChild(playText);

    this.app.stage.addChild(bottom);

    // Set the interactivity.
    bottom.eventMode = 'static';
    bottom.cursor = 'pointer';
    bottom.on('pointerdown', () => this.startPlay(50));
  }

  startPlay(result?) {
    if (this.running) return;
    this.running = true;

    this.reels.forEach((r) => (r.position = 0));

    const targetSymbols = getSymbolsForWinRatio(result);

    for (let i = 0; i < this.reels.length; i++) {
      const r = this.reels[i];
      let targetIndex: number;

      if (targetSymbols.length > 0) {
        targetIndex = this.reelPatterns[i].indexOf(
          this.REEL_SYMBOLS.indexOf(targetSymbols[i]),
        );
      } else {
        // If no win, choose a random non-matching symbol
        do {
          targetIndex = Math.floor(Math.random() * this.reelPatterns[i].length);
        } while (
          i > 0 &&
          this.REEL_SYMBOLS[this.reelPatterns[i][targetIndex]] ===
            this.REEL_SYMBOLS[
              this.reelPatterns[0][r.position % this.reelPatterns[0].length]
            ]
        );
      }
      // console.log(r);
      const extra = Math.floor(Math.random() * 3);

      const fullRotations = 10; // Number of full rotations before stopping
      const reelLength = this.REEL_SYMBOLS.length;
      const target =
        r.position +
        reelLength * fullRotations +
        this.SYMBOL_WEIGHTS[targetIndex];

      const time = 5000 + i * 600 + extra * 600;

      this.tweenTo(
        r,
        'position',
        target,
        time,
        this.backout(0.4),
        null,
        i === this.reels.length - 1 ? () => this.reelsComplete() : null,
      );
    }
  }

  private reelsComplete() {
    this.running = false;
  }

  private updateSlots() {
    // console.log('init');
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      reel.blur.blurY = (reel.position - reel.previousPosition) * 8;
      reel.previousPosition = reel.position;

      for (let j = 0; j < reel.symbols.length; j++) {
        const symbol = reel.symbols[j];
        const prevy = symbol.y;

        symbol.y =
          ((reel.position + j) % reel.symbols.length) * this.SYMBOL_SIZE -
          this.SYMBOL_SIZE;
        if (symbol.y < 0 && prevy > this.SYMBOL_SIZE) {
          // Don't change the texture here to maintain the determined result
          symbol.y += reel.symbols.length * this.SYMBOL_SIZE;
        }
      }
    }

    // Update tweens
    const now = Date.now();
    const remove = [];

    for (let i = 0; i < this.tweening.length; i++) {
      const t = this.tweening[i];
      const phase = Math.min(1, (now - t.start) / t.time);

      // Resign position
      t.object[t.property] = this.lerp(
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
    for (let i = 0; i < remove.length; i++) {
      this.tweening.splice(this.tweening.indexOf(remove[i]), 1);
    }
  }

  private tweenTo(
    object: any,
    property: string,
    target: number,
    time: number,
    easing: (t: number) => number,
    onchange: ((t: any) => void) | null,
    oncomplete: ((t: any) => void) | null,
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

    this.tweening.push(tween);
    return tween;
  }

  private lerp(a1: number, a2: number, t: number) {
    return a1 * (1 - t) + a2 * t;
  }

  private backout(amount: number) {
    return (t: number) => --t * t * ((amount + 1) * t + amount) + 1;
  }

  private getPositionForTexture(
    reelIndex: number,
    textureIndex: number,
  ): number {
    const reel = this.reels[reelIndex];
    const symbolsCount = reel.symbols.length;
    // Adjust for the current position of the reel
    const adjustedIndex =
      (textureIndex -
        (Math.floor(reel.position) % symbolsCount) +
        symbolsCount) %
      symbolsCount;
    return Math.floor(reel.position) + adjustedIndex;
  }
}

function getSymbolsForWinRatio(winRatio: number): string[] {
  switch (winRatio) {
    case 150:
      return ['Bell', 'Bell', 'Bell'];
    case 100:
      return ['Cherries', 'Cherries', 'Cherries'];
    case 90:
      return ['Grapes', 'Grapes', 'Grapes'];
    case 80:
      return ['Lemon', 'Lemon', 'Lemon'];
    case 70:
      return ['Melon', 'Melon', 'Melon'];
    case 60:
      return ['Orange', 'Orange', 'Orange'];
    case 50:
      return ['Scatter', 'Scatter', 'Scatter'];
    case 0:
      return ['Seven', 'Seven', 'Seven']; // Jackpot
    default:
      return []; // No win
  }
}
