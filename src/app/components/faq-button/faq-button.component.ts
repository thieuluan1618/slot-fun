import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-faq-button',
  standalone: true,
  imports: [],
  templateUrl: './faq-button.component.html',
  styleUrl: './faq-button.component.scss',
})
export class FaqButtonComponent {
  @Output() onclick = new EventEmitter<MouseEvent>();

  defaultImage = 'assets/buttons/faq-mouse-up.png';
  pressedImage = 'assets/buttons/faq-mouse-up.png';
  buttonImage = this.defaultImage;

  changeImage(pressed: boolean) {
    this.buttonImage = pressed ? this.pressedImage : this.defaultImage;
  }
}
