import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-money-display',
  standalone: true,
  imports: [],
  templateUrl: './money-display.component.html',
  styleUrl: './money-display.component.scss',
})
export class MoneyDisplayComponent {
  @Input() value: number = 1000000;
}
