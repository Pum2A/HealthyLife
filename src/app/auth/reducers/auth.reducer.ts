import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../store/actions';
import { RegisterError } from '../interfaces/register-error.interface';
import { state } from '@angular/animations';

export interface AuthState {
  // Inne pola stanu autoryzacji
  registerError: RegisterError | null;
  registerButtonDisabled: boolean;

}

const initialState: AuthState = {
  // Inicjalizacja innych pól stanu autoryzacji
  registerError: null,
  registerButtonDisabled: false

};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.registerFailure, (state, { error }) => ({
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


