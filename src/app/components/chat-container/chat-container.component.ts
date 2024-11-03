import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from '../../pipes/safe.pipe';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss',
})
export class ChatContainerComponent {
  kiwiUrl = environment.kiwiIrcEmbeddingUrl;

  width = environment.kiwiChatBoxWidth;
  height = environment.kiwiChatBoxHeight;

  constructor(private sanitizer: DomSanitizer) {}

  safeSrc() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.kiwiUrl)
  }
}
