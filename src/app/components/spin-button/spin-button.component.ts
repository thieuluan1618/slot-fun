import { Component, EventEmitter, Output } from '@angular/core';
import { finalize, Observable, scan, share, takeWhile, timer } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

export const COUNTDOWN_TIME = 15; // seconds

@Component({
  selector: 'app-spin-button',
  standalone: true,
  imports: [NgIf, NgForOf, AsyncPipe],
  templateUrl: './spin-button.component.html',
  styleUrl: './spin-button.component.scss',
})
export class SpinButtonComponent {
  @Output() onclick = new EventEmitter<MouseEvent>();

  defaultImage = 'assets/buttons/spin-mouse-up.png';
  pressedImage = 'assets/buttons/spin-mouse-down.png';
  buttonImage = this.defaultImage;

  startCountdown = false;

  numberImages = Array.from({ length: COUNTDOWN_TIME });

  // tslint:disable-next-line:variable-name
  _countdown$: Observable<number> = timer(0, 1000).pipe(
    scan((acc) => --acc, COUNTDOWN_TIME + 1),
    takeWhile((x) => x > 0),
    share(),
    finalize(() => {
      this.startCountdown = false;
      this.changeImage(false);
    }),
  );

  countdown$: Observable<number>;

  changeImage(pressed: boolean) {
    this.buttonImage = pressed ? this.pressedImage : this.defaultImage;
  }

  onSpin(event: MouseEvent) {
    this.onclick.emit(event);
    this.countdown$ = this._countdown$;
    this.startCountdown = true;
  }
}
