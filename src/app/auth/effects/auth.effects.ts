import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';


import * as AuthActions from '../store/actions';

@Injectable()
export class AuthEffects {
  registerAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerAction),
      switchMap(action => {
        const disableAction = AuthActions.setRegisterButtonDisabled({ disabled: true });
        return of(disableAction).pipe(

        );
      })
    )
  );
  loginAction$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.loginAction),
    switchMap(action => {
      const { username, password, email } = action.user;

      if (username === 'Edward' && password === 'HardcorePassword123!' && email === 'demo@account.com') {
        return of(AuthActions.loginSuccess({ message: 'Logowanie zakończone sukcesem!' }));
      } else {
        return of(AuthActions.loginFailureAction({ error:  { message: 'Nieprawidłowe dane logowania' } }));
      }
    })
  )
);


  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          alert('Rejestracja powiodła się!');
        })
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          alert('Logowanie powiodło się!');
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailureAction),
        tap(action => {
          console.error('Login failure:', action.error);
          // Możesz dodać logikę tutaj do wyświetlenia komunikatu błędu lub podejścia do obsługi błędu.
        })
      ),
    { dispatch: false }
  );








  constructor(private actions$: Actions) {}
}
