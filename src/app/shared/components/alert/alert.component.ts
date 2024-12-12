import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  host:{
    class: "absolute top-5 lg:animate-fadeSlideIn w-full left-[10%] "
  }
})
export class AlertComponent {
  @Input() alertType : string = "";
  @Input() alertMessage : string = "";
  @Output() closeEmitter = new EventEmitter<boolean>();

  onClickClose(){
    this.closeEmitter.emit();
  }
}
