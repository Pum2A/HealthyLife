import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { registerAction, registerSuccess } from '../../store/actions';
import { isRegisterButtonDisabled } from '../../selectors/buttonDisabled.selectors';
import { Observable } from 'rxjs';
import * as Actions from '../../store/actions';


@Component({
  selector: 'app-login',
  template: `
    <div class="background">

      <div class="form-container">

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <h2>Login in</h2>

        <label>Username</label>
          <input type="username" formControlName="username" placeholder="Username" [value]="demoCredentials.username" />
          <label>Password</label>

          <input type="password" formControlName="password" placeholder="Password" [value]="demoCredentials.password" />
          <label>Email</label>

          <input type="email" formControlName="email" [value]="demoCredentials.email" placeholder="Email" />
          <button class="login-btn" type="submit">Login</button>

          <div *ngIf="failureMessage" class="failure-message">
        <p class="register-failure-text">Register failure!</p>
        <button class="failure-btn" (click)="closeFailureMessage()">Close</button>


      </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  // form: FormGroup;
  registerButtonDisabled$: Observable<boolean>;

  passwordTooShortError: boolean = false;
  passwordMissingSpecialCharError: boolean = false;
  emailError: boolean = false;
  successfulMessage: boolean = false;
  failureMessage: boolean = false;
  messageTimeout: any;


  demoCredentials = {
    username: 'Edward',
    password: 'HardcorePassword123!',
    email: 'demo@account.com'
  };

  constructor(private fb: FormBuilder, private store: Store) {}

  form = this.fb.group({
    username: ['', Validators.required],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/.*[!@#$%^&*()].*/),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
  });

  closeSuccessMessage() {
    this.successfulMessage = false;
  }

  showSuccessMessage() {
    this.successfulMessage = true;
    this.messageTimeout = setTimeout(() => {
      this.closeSuccessMessage();
    }, 5000);
  }
  closeFailureMessage() {
    this.failureMessage = false;
  }

  showFailureMessage() {
    this.failureMessage = true;
    this.messageTimeout = setTimeout(() => {
      this.closeFailureMessage();
    }, 5000);
  }




  onSubmit() {
    if (this.form.valid) {
      const user = JSON.parse(localStorage.getItem('user'));

      // Porównaj z danymi demo dla logowania
      if (
        this.form.value.email === user.email &&
        this.form.value.password === user.password &&
        this.form.value.username === user.username
      ) {
        // Logowanie udane (demo)
        console.log('Login success');
        this.store.dispatch(
          Actions.loginSuccess({ message: 'Login success!' })
        );
      } else {
        // Logowanie nieudane (demo)
        console.log('Login failure');
        this.store.dispatch(Actions.loginFailureAction({ error: { message: 'Login failure' } }));
        this.showFailureMessage();

      }
    } else {
      // Walidacja i komunikaty błędów
      this.passwordTooShortError = this.form.get('password').hasError('minlength');
      this.passwordMissingSpecialCharError = !/.*[!@#$%^&*()].*/.test(
        this.form.get('password').value
      );
      this.emailError = this.form.get('email').hasError('email');

      if (this.passwordTooShortError) {
        this.store.dispatch(Actions.passwordTooShort());
      }
      if (this.passwordMissingSpecialCharError) {
        this.store.dispatch(Actions.passwordMissingSpecialChar());
      }
      if (this.emailError) {
        this.store.dispatch(Actions.emailInvalid());
      }
      if (this.successfulMessage) {
        this.store.dispatch(
          Actions.loginSuccess({ message: 'Login success!' })
        );
      }
      if (this.failureMessage) {
        this.store.dispatch(
          Actions.loginSuccess({ message: 'Login Failure!' })
        );
      }
    }
  }

}
