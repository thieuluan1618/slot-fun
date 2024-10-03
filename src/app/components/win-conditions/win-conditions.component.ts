import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-win-conditions',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './win-conditions.component.html',
  styleUrl: './win-conditions.component.scss',
})
export class WinConditionsComponent {
  items = [
    { image: 'Bell', value: 150 },
    { image: 'Cherries', value: 100 },
    { image: 'Grapes', value: 90 },
    { image: 'Lemon', value: 80 },
    { image: 'Melon', value: 70 },
    { image: 'Orange', value: 60 },
    { image: 'Scatter', value: 50 },
  ];
}
