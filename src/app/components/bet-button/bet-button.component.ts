import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bet-button',
  standalone: true,
  imports: [],
  templateUrl: './bet-button.component.html',
  styleUrl: './bet-button.component.scss',
})
export class BetButtonComponent {
  @Output() onclick = new EventEmitter<MouseEvent>();

  defaultImage = 'assets/buttons/bet-mouse-up.png';
  pressedImage = 'assets/buttons/bet-mouse-down.png';
  buttonImage = this.defaultImage;

  changeImage(pressed: boolean) {
    this.buttonImage = pressed ? this.pressedImage : this.defaultImage;
  }
}
