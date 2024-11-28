import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {

}
