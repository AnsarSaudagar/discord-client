import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  host: {
    class: 'h-full w-full lg:w-[32%] lg:h-[80%]',
  },
})
export class SignupComponent {
  signupForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.signupForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      display_name: [null],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onContinue() {
    this.isSubmitted = true;
    if (this.signupForm.valid) {
      this.isSubmitted = false;
      const formValues: User = this.signupForm.value;

      formValues['dob'] = "2008-11-1"; // For now giving default value

      this.authService.signup(formValues).subscribe({
        next: (user: User) => {
          this.signupForm.reset();
          this.router.navigate(['auth', 'login']);
        },
      });
    }
  }

  onClickAlready() {
    this.router.navigate(['auth', 'login']);
  }

  getValidationCondition(input_name: string) {
    return (
      (this.signupForm.get(input_name)?.errors &&
        this.signupForm.get(input_name)?.touched) ||
      (this.signupForm.get(input_name)?.errors && this.isSubmitted)
    );
  }
}
