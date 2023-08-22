import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import * as AuthActions from '../../actions/auth.actions';
import { User } from '../../interfaces/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { registerAction } from '../../store/actions';

@Component({
  selector: 'app-register',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>Username:</label>
      <input type="text" formControlName="username" name="username" required />

      <label>Password:</label>
      <input
        type="password"
        formControlName="password"
        name="password"
        required
      />

      <label>Email:</label>
      <input type="text" formControlName="email" name="email" required />

      <button type="submit">Register</button>
    </form>
  `,
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    console.log('initializeForm');
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('submit', this.form.value, this.form.valid);
    this.store.dispatch(registerAction(this.form.value));
  }
}
