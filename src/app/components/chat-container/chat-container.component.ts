import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss',
})
export class ChatContainerComponent implements OnInit {
  kiwiUrl = 'https://kiwiirc.com/nextclient/';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}
}
