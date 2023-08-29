import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../store/actions';
import { RegisterError } from '../interfaces/register-error.interface';
import { state } from '@angular/animations';
import { State } from '@ngrx/store';
import { LoginError } from '../interfaces/login-error.interface';

export interface AuthState {
  // Inne pola stanu autoryzacji
  registerError: RegisterError | null;
  registerButtonDisabled: boolean;
  loginError: LoginError | null;

}

const initialState: AuthState = {
  // Inicjalizacja innych pól stanu autoryzacji
  registerError: null,
  registerButtonDisabled: false,
  loginError: null,

};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.registerFailure, (state) => ({
    ...state,
    registerButtonDisabled: false

  })),
  on(AuthActions.loginFailureAction, (state, { error }) => ({
    ...state,
    registerError: error,
    registerButtonDisabled: false

  })),
  on(AuthActions.setRegisterButtonDisabled, (state, { disabled }) => ({
    ...state,
    registerButtonDisabled: disabled
  })),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    registerButtonDisabled: false
  })),
  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    registerButtonDisabled: false
  })),
  on(AuthActions.passwordTooShort, state => ({
    ...state,
    passwordError: 'Password must be at least 8 characters long.'
  })),
  on(AuthActions.passwordMissingSpecialChar, state => ({
    ...state,
    passwordError: 'Password must contain at least one special character.'
  })),
  on(AuthActions.emailInvalid, state => ({
    ...state,
    emailError: 'Wrong email structure.'
  }))

);


