import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-clear-button',
  standalone: true,
  imports: [],
  templateUrl: './clear-button.component.html',
  styleUrl: './clear-button.component.scss',
})
export class ClearButtonComponent {
  @Output() onclick = new EventEmitter<MouseEvent>();

  defaultImage = 'assets/buttons/clear-mouse-up.png';
  pressedImage = 'assets/buttons/clear-mouse-down.png';
  buttonImage = this.defaultImage;

  changeImage(pressed: boolean) {
    this.buttonImage = pressed ? this.pressedImage : this.defaultImage;
  }
}
