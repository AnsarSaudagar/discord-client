import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { initFlowbite } from 'flowbite';
import { AuthService } from './auth-page/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'discord-client';

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    initFlowbite();
    this.authService.autoLogin();
  }
}
