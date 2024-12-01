import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: {
    class: 'h-full w-full lg:w-[32%] lg:h-[50%]',
  },
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  onClickRegister() {
    this.router.navigate(['auth', 'signup']);
  }
  
  onClickLogin(){

  }
}
