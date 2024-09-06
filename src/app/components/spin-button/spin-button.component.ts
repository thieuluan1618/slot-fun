import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-spin-button',
  standalone: true,
  imports: [],
  templateUrl: './spin-button.component.html',
  styleUrl: './spin-button.component.scss',
})
export class SpinButtonComponent {
  @Output() onclick = new EventEmitter<MouseEvent>();

  defaultImage = 'assets/buttons/spin-mouse-up.png';
  pressedImage = 'assets/buttons/spin-mouse-down.png';
  buttonImage = this.defaultImage;

  changeImage(pressed: boolean) {
    this.buttonImage = pressed ? this.pressedImage : this.defaultImage;
  }
}
