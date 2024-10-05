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
  winConditions = [
    {
      symbol: '🛎️',
      image: '/assets/symbols/Bell.png',
      line: 'Any line',
      ratio: '150%',
    },
    {
      symbol: '🍒',
      image: '/assets/symbols/Cherries.png',
      line: 'Any line',
      ratio: '100%',
    },
    {
      symbol: '🍇',
      image: '/assets/symbols/Grape.png',
      line: 'Any line',
      ratio: '90%',
    },
    {
      symbol: '🍋',
      image: '/assets/symbols/Lemon.png',
      line: 'Any line',
      ratio: '80%',
    },
    {
      symbol: '🍈',
      image: '/assets/symbols/Melon.png',
      line: 'Any line',
      ratio: '70%',
    },
    {
      symbol: '🍊',
      image: '/assets/symbols/Orange.png',
      line: 'Any line',
      ratio: '60%',
    },
    {
      symbol: '⚡',
      image: '/assets/symbols/Scatter.png',
      line: 'Any line',
      ratio: '50%',
    },
    {
      symbol: '⚡',
      image: '/assets/symbols/7.png',
      line: 'Any line',
      ratio: 'Jackpot',
    },
  ];
}
