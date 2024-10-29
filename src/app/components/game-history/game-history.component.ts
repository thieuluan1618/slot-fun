import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-game-history',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './game-history.component.html',
  styleUrl: './game-history.component.scss',
})
export class GameHistoryComponent {
  @Input() history: boolean[] = [
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    true,
  ];
}
