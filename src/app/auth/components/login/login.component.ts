import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { registerAction, registerSuccess } from '../../store/actions';
import { isRegisterButtonDisabled } from '../../selectors/buttonDisabled.selectors';
import { Observable } from 'rxjs';
import { Router,ParamMap } from '@angular/router';
import * as Actions from '../../store/actions';
import { state } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';




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
          <input type="email" formControlName="email" [value]="demoCredentials.email" placeholder="Email" />
          <div *ngIf="emailError" class="email-error">
        <p class="error-message">

          Bad mail structure.
        </p>
      </div>

          <button class="login-btn" type="submit">Login</button>

          <div *ngIf="successfulMessage" class="success-message">
        <p class="register-success-text">Register successfully!</p>
        <button class="success-btn" (click)="closeSuccessMessage()">Close</button>
      </div>

          <div *ngIf="failureMessage" class="failure-message">
        <p class="register-failure-text">Register failure!</p>
        <button class="failure-btn" (click)="closeFailureMessage()">Close</button>


      </div>
      <div class="register-container">

        <p>Create your account!
          <a routerLink="/register">

            Register yourself!
          </a>
          <div class="demo-account-container">
            <h3>

              Demo account:
            </h3>
            <p>
              Username: Edward
            </p>
            <p>

              Password: HardcorePassword123!
            </p>
            <p>

           Email: demo&#64;account.com
            </p>
            <p class="remember-text">Remember you need to register first yourself to use this app.</p>

          </div>
        </div>

        </form>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  // form: FormGroup;
  registerButtonDisabled$: Observable<boolean>;

  passwordTooShortError: boolean = false;
  passwordMissingSpecialCharError: boolean = false;
  emailError: boolean = false;
  successfulMessage: boolean = false;
  failureMessage: boolean = false;
  messageTimeout: any;
  returnUrl: string = '/';



  demoCredentials = {
    username: 'Edward',
    password: 'HardcorePassword123!',
    email: 'demo@account.com'
  };

  constructor(private fb: FormBuilder, private store: Store, private router:Router, private route:ActivatedRoute) {}

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


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/home';
      console.log('returnUrl:', this.returnUrl);
    });
  }





  onSubmit() {
    if (this.form.valid) {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      console.log('Form value:', this.form.value);
      console.log('Stored user:', storedUser);

      // Porównaj z danymi demo dla logowania
      if (
        this.form.value.email === storedUser.email &&
        this.form.value.password === storedUser.password &&
        this.form.value.username === storedUser.username
      ) {
        // Logowanie udane (demo)
        console.log('Login success');

        // Wyświetlanie informacji o poprawnym zalogowaniu
        this.showSuccessMessage();

        // Przekierowanie do returnUrl lub domyślnie '/home'
        console.log('Redirecting to:', this.returnUrl || '/home');
        this.router.navigate([this.returnUrl || '/home']);
      } else {
        // Logowanie nieudane (demo)
        console.log('Login failure');

        // Wyświetlanie informacji o błędzie logowania
        this.showFailureMessage();
      }
    } else{
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
        this.store.dispatch(Actions.loginSuccess({ message: 'Login success!' }));
      }
      if (this.failureMessage) {
        this.store.dispatch(Actions.loginSuccess({ message: 'Login Failure!' }));
      }
    }
  }


}
