import { Component, ViewChild } from '@angular/core';
import { BG_COLOR } from '../../shared/color';
import { NgClass, NgOptimizedImage } from '@angular/common';
import {
  COUNTDOWN_TIME,
  SpinButtonComponent,
} from '../../components/spin-button/spin-button.component';
import { BetButtonComponent } from '../../components/bet-button/bet-button.component';
import { ClearButtonComponent } from '../../components/clear-button/clear-button.component';
import { FaqButtonComponent } from '../../components/faq-button/faq-button.component';
import { MaxBetButtonComponent } from '../../components/max-bet-button/max-bet-button.component';
import { ChipComponent } from '../../components/chip/chip.component';
import { GameHistoryComponent } from '../../components/game-history/game-history.component';
import { MoneyDisplayComponent } from '../../components/money-display/money-display.component';
import { ApiService, WalletInfo } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { BetResult, UserBalance } from '../../models/game-slot.model';
import { SocketService } from '../../services/socket.service';
import { YourLuckHereTextComponent } from '../../components/your-luck-here-text/your-luck-here-text.component';
import { Reels } from '../reels/reels';
import { LightComponent } from '../../components/light/light.component';

@Component({
  selector: 'app-slot-machine',
  standalone: true,
  imports: [
    NgClass,
    SpinButtonComponent,
    SpinButtonComponent,
    BetButtonComponent,
    ClearButtonComponent,
    FaqButtonComponent,
    MaxBetButtonComponent,
    ChipComponent,
    GameHistoryComponent,
    MoneyDisplayComponent,
    YourLuckHereTextComponent,
    NgOptimizedImage,
    Reels,
    LightComponent,
  ],
  templateUrl: './slot-machine.component.html',
  styleUrl: './slot-machine.component.scss',
})
export class SlotMachineComponent {
  public playerScore = 10;
  public knobClicked = false;
  public isSpinning = false;

  public debitedMoney: number | string = 0;
  public showDebitMoney = false;

  selectedChipValue = 0;
  totalBet = 0;
  totalWin = 0;
  currentWin = 0;
  userBalance: UserBalance;
  currentWallet: string;
  history: boolean[] = Array.from({ length: 10 }, () => Math.random() < 0.5);

  private knobPullSound = '../../../assets/audio/knob-pull.mp3';
  private spinningSound = '../../../assets/audio/spinning.mp3';
  private payOutSound = '../../../assets/audio/pay-out.wav';

  @ViewChild(Reels) reels: Reels;

  @ViewChild('wheelCell1', { static: false }) wheel1;
  @ViewChild('wheelCell2', { static: false }) wheel2;
  @ViewChild('wheelCell3', { static: false }) wheel3;
  @ViewChild('debugWheel1', { static: false }) debugWheel1;
  @ViewChild('debugWheel2', { static: false }) debugWheel2;
  @ViewChild('debugWheel3', { static: false }) debugWheel3;

  constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
    private readonly socketService: SocketService,
  ) {
    this.authService.login().subscribe((userInfo) => {
      console.log(userInfo);
      this.socketService.connect();
      this.apiService.joinRoom('main').subscribe((r: WalletInfo) => {
        this.currentWallet = r.playMode;
        this.totalWin = r.userBalance;
        this.fetchHistory();
      });
      this.apiService.getUserBalance().subscribe((b) => {
        this.userBalance = b;
      });
      // this.apiService
      //   .getHistory({ wallet: this.currentWallet, userId: '' })
      //   .subscribe((h) => console.log(h));
      // this.authService.getAsset().subscribe((a) => {
      //   console.log(a);
      // });
      //
    });
  }

  fetchHistory(): void {
    this.apiService
      .getHistory({ wallet: this.currentWallet })
      .subscribe((h) => console.log({ h }));
  }

  getCurrentUserBalance(): number {
    return this.userBalance?.[this.currentWallet]?.VND;
  }

  clearBet(): void {
    this.totalBet = 0;
    this.selectedChipValue = 0;
  }

  maxBet(): void {
    this.totalBet = this.getCurrentUserBalance();
    this.selectedChipValue = 0;
  }

  public knobPulled() {
    this.apiService.placeOrder(this.totalBet).subscribe((res: BetResult) => {
      console.log({ betResult: res });
      if (res.betResult === 'win') {
        this.reels.startPlay(res.betResultType);
      } else {
        this.reels.startPlay();
      }
      this.fetchHistory();
    });

    if (this.playerScore > 0) {
      this.knobClicked = true;
      this.showDebitMoney = false;
      this.isSpinning = true;
      this.reset();
      this.resetBgColor();
      this.knobPullPlay(this.knobPullSound);
      setTimeout(() => (this.knobClicked = false), 1500);
      // setTimeout(() => {
      //   this.startSpinning();
      // }, 1000);
      this.playerScore--;
      this.debitedMoney = -1;

      this.showDebitMoney = true;
    }
  }

  private knobPullPlay(src) {
    this.playAudio(src);
  }
  private spinningPlay(src) {
    this.playAudio(src);
  }
  private payoutPlay(src) {
    this.playAudio(src);
  }

  public playAudio(src) {
    let audio = new Audio();
    audio.src = src; // "../../../assets/audio/spinning.mp3";
    audio.load();
    audio.play();
  }

  selectChip(value: number): void {
    this.selectedChipValue = value;
  }

  onBet(): void {
    this.totalBet += this.selectedChipValue;
    this.selectedChipValue = 0;
  }

  private reset() {}

  private resetBgColor() {}

  onDragStart(event: DragEvent) {
    event.dataTransfer.setData('text', (event.target as HTMLElement).id);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    const { target } = event;
    const { childNodes } = target as HTMLElement;
    if (childNodes.length > 0) {
      (target as HTMLElement).removeChild(childNodes[0]);
    }
    (target as HTMLElement).appendChild(
      document
        .getElementById(event.dataTransfer.getData('text'))
        .cloneNode(true),
    );
  }
}
