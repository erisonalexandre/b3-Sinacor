import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.nonNullable.group({
    email: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.fb.nonNullable.control('', Validators.required),
  });

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
  ) {}

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const formRawValue = this.loginForm.getRawValue();
    this.authService
      .login({
        email: formRawValue.email,
        password: formRawValue.password,
      })
      .subscribe(() => {
        this.router.navigate(['/fluxo-caixa']);
      });
  }
}
