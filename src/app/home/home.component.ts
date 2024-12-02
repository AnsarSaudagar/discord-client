import { Component } from '@angular/core';
import { AuthService } from '../auth-page/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private authService : AuthService){

  }
  ngOnInit(){
  }
}
