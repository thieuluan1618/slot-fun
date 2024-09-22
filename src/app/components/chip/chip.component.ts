import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent implements OnChanges {
  @Input() value: number;
  @Input() selectedValue: number;

  @Output() onclick = new EventEmitter<MouseEvent>();

  buttonImage = '';

  ngOnChanges(changes: SimpleChanges) {
    this.buttonImage = `assets/buttons/chips/chip-${this.value}.png`;
  }

  changeImage(pressed: boolean) {
    // this.buttonImage = pressed ? this.pressedImage : this.defaultImage;
  }
}
