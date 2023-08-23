import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isRegisterButtonDisabled = createSelector(
  selectAuthState,
  (state: AuthState) => state.registerButtonDisabled
);
