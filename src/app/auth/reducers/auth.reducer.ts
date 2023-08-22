import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../store/actions';
import { RegisterError } from '../interfaces/register-error.interface';

export interface AuthState {
  // Inne pola stanu autoryzacji
  registerError: RegisterError | null;
}

const initialState: AuthState = {
  // Inicjalizacja innych pól stanu autoryzacji
  registerError: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    registerError: error
  })),
  // Inne obsługi akcji autoryzacji
);
