import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'discord-client';

  ngOnInit(): void {
    initFlowbite();
  }
}
