import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-money-display',
  standalone: true,
  imports: [NgIf],
  templateUrl: './money-display.component.html',
  styleUrl: './money-display.component.scss',
})
export class MoneyDisplayComponent {
  @Input() value = 0;
  @Input() imgSrc = '';
}
