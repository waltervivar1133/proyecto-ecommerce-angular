import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { AlertComponent } from '@shared/components/alert/alert.component';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule, AlertComponent],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  formBuilder = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService);

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fullName: ['', [Validators.required]],
  });

  onRegister() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 3000);
      return;
    }

    const {
      email = '',
      password = '',
      fullName = '',
    } = this.registerForm.value;
    console.log({ email, password, fullName });

    this.authService.register(email!, password!, fullName!).subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          console.log('register successful');
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
