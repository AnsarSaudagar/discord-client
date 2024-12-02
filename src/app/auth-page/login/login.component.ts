import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginCredentials, LoginResponse } from '../../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: {
    class: 'h-full w-full lg:w-[32%] lg:h-[50%]',
  },
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onClickRegister() {
    this.router.navigate(['auth', 'signup']);
  }

  onClickLogin() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      const formValues: LoginCredentials = this.loginForm.value;
      this.authService.login(formValues).subscribe({
        next: (login_res: LoginResponse) => {
          // console.log(login_res);
          this.router.navigate(['/']);
        },
      });
    }
  }

  getValidationCondition(input_name: string) {
    return (
      (this.loginForm.get(input_name)?.errors &&
        this.loginForm.get(input_name)?.touched) ||
      (this.loginForm.get(input_name)?.errors && this.isSubmitted)
    );
  }
}
