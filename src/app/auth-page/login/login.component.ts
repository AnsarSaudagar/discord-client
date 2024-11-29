import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: {
    class: 'h-full w-full lg:w-[32%] lg:h-[50%]',
  },
})
export class LoginComponent {

  constructor(
    private router: Router
  ){

  }

  onClickRegister(){
    this.router.navigate(['auth', 'signup'])
  }
}
