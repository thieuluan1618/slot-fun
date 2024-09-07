import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-max-bet-button',
  standalone: true,
  imports: [],
  templateUrl: './max-bet-button.component.html',
  styleUrl: './max-bet-button.component.scss',
})
export class MaxBetButtonComponent {
  @Output() onclick = new EventEmitter<MouseEvent>();

  defaultImage = 'assets/buttons/max-bet-mouse-up.png';
  pressedImage = 'assets/buttons/max-bet-mouse-down.png';
  buttonImage = this.defaultImage;

  changeImage(pressed: boolean) {
    this.buttonImage = pressed ? this.pressedImage : this.defaultImage;
  }
}
