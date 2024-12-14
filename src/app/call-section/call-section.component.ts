import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-call-section',
  standalone: true,
  imports: [],
  templateUrl: './call-section.component.html',
  styleUrl: './call-section.component.css',
  host: {
    'class' : "absolute top-0  w-full bg-black"
  }
})
export class CallSectionComponent {
  @ViewChild('resizableDiv') resizableDiv!: ElementRef;
  private isResizing = false;
  private startY = 0;
  private startHeight = 0;

  onMouseDown(event: MouseEvent): void {
    console.log("down");
    
    this.isResizing = true;
    this.startY = event.clientY;
    this.startHeight = this.resizableDiv.nativeElement.offsetHeight;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event: MouseEvent): void => {
    if (this.isResizing) {
      const newHeight = this.startHeight + (event.clientY - this.startY);
      this.resizableDiv.nativeElement.style.height = `${newHeight}px`;
    }
  };

  onMouseUp = (): void => {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };
}
