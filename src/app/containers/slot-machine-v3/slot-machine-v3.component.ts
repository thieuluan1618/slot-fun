// slot-machine.component.ts

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  selector: 'app-slot-machine-v3',
  template: '<div #pixiContainer></div>',
  styleUrls: ['./slot-machine-v3.component.scss'],
  standalone: true,
})
export class SlotMachineV3Component implements OnInit {
  @ViewChild('pixiContainer', { static: true }) pixiContainer!: ElementRef;

  private app!: Application;
  private readonly REEL_WIDTH = 160;
  private readonly SYMBOL_SIZE = 150;
  private reels: any[] = [];
  private running = false;
  private slotTextures: Texture[] = [];
  private tweening: any[] = [];

  constructor() {}

  ngOnInit() {}

  async ngAfterViewInit() {
    await this.initPixiApp();
    await this.loadAssets();
  }

  private async initPixiApp() {
    this.app = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });

    await this.app.init();

    this.pixiContainer.nativeElement.appendChild(this.app.canvas);

    // Set up the ticker
    this.app.ticker.add(() => {
      this.updateSlots();
    });
  }

  private async loadAssets() {
    await Assets.load([
      '/assets/symbols/Cherries.png',
      '/assets/symbols/Grape.png',
      '/assets/symbols/Lemon.png',
      '/assets/symbols/Melon.png',
    ]);
    this.onAssetsLoaded();
  }

  private onAssetsLoaded() {
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
    this.createCovers();
  }

  private createReels() {
    const reelContainer = new Container();
    for (let i = 0; i < 5; i++) {
      const rc = new Container();
      rc.x = i * this.REEL_WIDTH;
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
      for (let j = 0; j < 4; j++) {
        const symbol = new Sprite(
          this.slotTextures[
            Math.floor(Math.random() * this.slotTextures.length)
          ],
        );
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
    reelContainer.x = Math.round(this.app.screen.width - this.REEL_WIDTH * 5);
  }

  private createCovers() {
    const margin = (this.app.screen.height - this.SYMBOL_SIZE * 3) / 2;

    const top = new Container();
    const topBackground = new Graphics();
    topBackground.beginFill(0, 1);
    topBackground.drawRect(0, 0, this.app.screen.width, margin);
    top.addChild(topBackground);

    const bottom = new Container();
    const bottomBackground = new Graphics();
    bottomBackground.beginFill(0, 1);
    bottomBackground.drawRect(
      0,
      this.SYMBOL_SIZE * 3 + margin,
      this.app.screen.width,
      margin,
    );
    bottom.addChild(bottomBackground);

    // Add play text
    const style = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      stroke: '#4a1850',
      // strokeThickness: 5,
      dropShadow: true,
      // dropShadowColor: '#000000',
      // dropShadowBlur: 4,
      // dropShadowAngle: Math.PI / 6,
      // dropShadowDistance: 6,
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

    // Add header text
    const headerText = new Text('PIXI MONSTER SLOTS!', style);
    headerText.x = Math.round((this.app.screen.width - headerText.width) / 2);
    headerText.y = Math.round((margin - headerText.height) / 2);
    top.addChild(headerText);

    this.app.stage.addChild(top);
    this.app.stage.addChild(bottom);

    // Set the interactivity.
    bottom.eventMode = 'static';
    bottom.cursor = 'pointer';
    bottom.on('pointerdown', () => this.startPlay());
  }

  private startPlay() {
    if (this.running) return;
    this.running = true;

    for (let i = 0; i < this.reels.length; i++) {
      const r = this.reels[i];
      const extra = Math.floor(Math.random() * 3);
      const target = r.position + 10 + i * 5 + extra;
      const time = 2500 + i * 600 + extra * 600;
      this.tweenTo(
        r,
        'position',
        target,
        time,
        this.backout(0.5),
        null,
        i === this.reels.length - 1 ? () => this.reelsComplete() : null,
      );
    }
  }

  private reelsComplete() {
    this.running = false;
  }

  private updateSlots() {
    for (let i = 0; i < this.reels.length; i++) {
      const r = this.reels[i];
      r.blur.blurY = (r.position - r.previousPosition) * 8;
      r.previousPosition = r.position;

      for (let j = 0; j < r.symbols.length; j++) {
        const s = r.symbols[j];
        const prevy = s.y;
        s.y =
          ((r.position + j) % r.symbols.length) * this.SYMBOL_SIZE -
          this.SYMBOL_SIZE;
        if (s.y < 0 && prevy > this.SYMBOL_SIZE) {
          s.texture =
            this.slotTextures[
              Math.floor(Math.random() * this.slotTextures.length)
            ];
          s.scale.x = s.scale.y = Math.min(
            this.SYMBOL_SIZE / s.texture.width,
            this.SYMBOL_SIZE / s.texture.height,
          );
          s.x = Math.round((this.SYMBOL_SIZE - s.width) / 2);
        }
      }
    }

    // Update tweens
    const now = Date.now();
    const remove = [];
    for (let i = 0; i < this.tweening.length; i++) {
      const t = this.tweening[i];
      const phase = Math.min(1, (now - t.start) / t.time);

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
}
