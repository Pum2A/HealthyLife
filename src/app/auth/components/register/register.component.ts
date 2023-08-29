import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { registerAction, registerSuccess } from '../../store/actions';
import { isRegisterButtonDisabled } from '../../selectors/buttonDisabled.selectors';
import { Observable } from 'rxjs';
import * as Actions from '../../store/actions';

@Component({
  selector: 'app-register',
  template: `
  <div class="background">

    <div class="form-container">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <h2>Register Yourself</h2>
      <label>Username</label>
      <input type="text" formControlName="username" name="username" placeholder="Username" [value]="demoCredentials.username"  [ngClass]="{'valid': form.get('username').valid, 'invalid': form.get('username').invalid}" required />
      <label>Password</label>
      <input
      type="password"
      formControlName="password"
      name="password"
      placeholder="Password"
      [value]="demoCredentials.password"
      [ngClass]="{'valid': form.get('password').valid, 'invalid': form.get('password').invalid}"
      required
      />
      <p class="info-text">The password must contain one special character and be 8 characters long.</p>
      <div *ngIf="passwordTooShortError" class="error-message">
        <p class="error-message">

         Password is too short.
        </p>
      </div>
      <div *ngIf="passwordMissingSpecialCharError" class="error-message">
        <p class="error-message">

          The password must contain at least one special character.
        </p>
      </div>

      <label>Email</label>
      <input type="text" formControlName="email" name="email" placeholder="Email" [value]="demoCredentials.email"  [ngClass]="{'valid': form.get('email').valid, 'invalid': form.get('email').invalid}" required />
      <div *ngIf="emailError" class="email-error">
        <p class="error-message">

          Bad mail structure.
        </p>
      </div>

      <button class="register-btn" [disabled]="registerButtonDisabled$ | async" [ngClass]="{'disabled-button': (registerButtonDisabled$ | async)}"   type="submit">
        Register
      </button>
      <div *ngIf="successfulMessage" class="success-message">
        <p class="register-success-text">Register successfully!</p>
        <button class="success-btn" (click)="closeSuccessMessage()">Close</button>
      </div>

      <div *ngIf="failureMessage" class="failure-message">
        <p class="register-failure-text">Register failure!</p>
        <button class="failure-btn" (click)="closeFailureMessage()">Close</button>
</div>

      <div class="login-container">
      <p>Do you have account?
        <a routerLink="/login">

          Login in!
        </a>

        </p>
      <button routerLink="/login">Login in</button>
      </div>
    </form>
  </div>
</div>
  `,
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
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



  constructor(
    private store: Store,
    private fb: FormBuilder,


  ) {}




  ngOnInit(): void {
    this.initializeForm();
    this.registerButtonDisabled$ = this.store.select(isRegisterButtonDisabled);

    this.registerButtonDisabled$.subscribe((disabled) => {
      console.log('Register Button Disabled:', disabled);


    });


    this.successfulMessage = false;
    this.failureMessage = false;

  }

  initializeForm() {
    console.log('initializeForm');
    this.form = this.fb.group({
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
  }

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
      const user: User = this.form.value;

      // Porównaj z danymi demo dla rejestracji
      if (
        user.username === this.demoCredentials.username &&
        user.password === this.demoCredentials.password &&
        user.email === this.demoCredentials.email
      ) {
        // Rejestracja udana (dla celów demonstracyjnych)
        console.log('Register success');
        this.store.dispatch(registerAction({ user }));
        localStorage.setItem('user', JSON.stringify(user));

        this.showSuccessMessage();
      } else {
        // Rejestracja nieudana (dla celów demonstracyjnych)
        console.log('Register failure');
        this.store.dispatch(Actions.registerFailure({  message: 'Register failure' }));
        this.showFailureMessage();


      }
    } else {
      // Właściwa walidacja i komunikaty błędów
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
          Actions.registerSuccess({
            message: 'Register success!',
          })
        );
      }
      if (this.failureMessage) {
        this.store.dispatch(
          Actions.registerFailure({
            message: 'Register Failure!',
          })
        );
      }
    }
  }


  getUser(): User {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    } else {
      return null;
    }
  }

}
