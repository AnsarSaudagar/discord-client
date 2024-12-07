import { Component } from '@angular/core';
import { LayoutWrapperComponent } from '../wrappers/layout-wrapper/layout-wrapper.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [LayoutWrapperComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

}
