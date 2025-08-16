import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule, AlertComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  formBuilder = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 3000);
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;
    console.log({ email, password });

    this.authService.login(email!, password!).subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          console.log('Login successful');
          this.router.navigateByUrl('/');
        } else {
          this.hasError.set(true);
          setTimeout(() => this.hasError.set(false), 2000);
        }
      },
      error: () => {
        this.hasError.set(true);
        setTimeout(() => this.hasError.set(false), 2000);
      },
    });
  }
}
