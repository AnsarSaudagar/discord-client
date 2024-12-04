import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-section.component.html',
  styleUrl: './chat-section.component.css',
  host:{
    class: "flex-[1]"
  }
})
export class ChatSectionComponent {
  focusInput :boolean = false;
}
