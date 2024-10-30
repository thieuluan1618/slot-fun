import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-light',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './light.component.html',
  styleUrl: './light.component.scss',
})
export class LightComponent {
  @Input() type: 'left' | 'right' = 'left';
}
