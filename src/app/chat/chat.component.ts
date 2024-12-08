import { Component } from '@angular/core';
import { LayoutWrapperComponent } from '../wrappers/layout-wrapper/layout-wrapper.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [LayoutWrapperComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  host: {
    class: "flex-[1] relative"
  }
})
export class ChatComponent {
  onEnter(){
    
  }
}
