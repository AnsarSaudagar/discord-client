import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  host: {
    class: 'h-full w-full lg:w-[32%] lg:h-[80%]',
  },
})
export class SignupComponent {
  constructor(private router: Router) {}

  onClickAlready(){
    this.router.navigate(['/login']);
  }
}
