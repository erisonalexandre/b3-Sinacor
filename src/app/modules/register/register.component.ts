import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = this.fb.nonNullable.group(
    {
      name: this.fb.nonNullable.control('', Validators.required),
      email: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirmation: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    {
      validators: [this.validatorPassword],
    },
  );

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
  ) {}

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const formRawValue = this.registerForm.getRawValue();
    this.authService
      .createUser(formRawValue.email, formRawValue.name, formRawValue.password)
      .subscribe(() => {
        this.router.navigate(['/fluxo-caixa']);
      });
  }

  validatorPassword(formGroup: AbstractControl) {
    const password = formGroup.get('password')?.value;
    const passwordConfirmation = formGroup.get('passwordConfirmation')?.value;

    if (password !== passwordConfirmation) {
      formGroup
        .get('passwordConfirmation')
        ?.setErrors({ mustMatchPassword: true });
      return { mustMatchPassword: true };
    }
    formGroup.get('passwordConfirmation')?.setErrors(null);
    return null;
  }
}
