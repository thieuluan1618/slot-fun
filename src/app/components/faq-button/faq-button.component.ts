import {
  Component,
  EventEmitter,
  inject,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WinConditionsComponent } from '../win-conditions/win-conditions.component';

@Component({
  selector: 'app-faq-button',
  standalone: true,
  imports: [WinConditionsComponent],
  templateUrl: './faq-button.component.html',
  styleUrl: './faq-button.component.scss',
})
export class FaqButtonComponent {
  @Output() onclick = new EventEmitter<MouseEvent>();

  defaultImage = 'assets/buttons/faq-mouse-up.png';
  pressedImage = 'assets/buttons/faq-mouse-up.png';
  buttonImage = this.defaultImage;

  private modalService = inject(NgbModal);

  changeImage(pressed: boolean) {
    this.buttonImage = pressed ? this.pressedImage : this.defaultImage;
  }

  click(content: any) {
    this.onclick.emit();

    // this.modalService.open();
    // this.open(content)
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then(
        (result) => {
          // this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
  }
}
