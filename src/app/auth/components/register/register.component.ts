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
   <form [formGroup]="form" (ngSubmit)="onSubmit()">
  <label>Username:</label>
  <input type="text" formControlName="username" name="username" required />

  <label>Password:</label>
<input type="password" formControlName="password" name="password" required />
<div *ngIf="passwordTooShortError" class="error-message">
  Hasło jest zbyt krótkie.
</div>
<div *ngIf="passwordMissingSpecialCharError" class="error-message">
  Hasło musi zawierać przynajmniej jeden znak specjalny.
</div>


  <label>Email:</label>
  <input type="text" formControlName="email" name="email" required />

  <button [disabled]="(registerButtonDisabled$ | async)" type="submit">Register</button>
</form>

  `,
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  registerButtonDisabled$: Observable<boolean>;

  passwordTooShortError: boolean = false;
  passwordMissingSpecialCharError: boolean = false;
  emailError: boolean = false;


  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.registerButtonDisabled$ = this.store.select(isRegisterButtonDisabled);

    this.registerButtonDisabled$.subscribe(disabled => {
      console.log('Register Button Disabled:', disabled);
    });




  }


  initializeForm() {
    console.log('initializeForm');
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/.*[!@#$%^&*()].*/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const user: User = this.form.value;
      this.store.dispatch(registerAction({ user }));
    } else {
      this.passwordTooShortError = this.form.get('password').hasError('minlength');
      this.passwordMissingSpecialCharError = !(/.*[!@#$%^&*()].*/).test(this.form.get('password').value);
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
    }
  }







}
