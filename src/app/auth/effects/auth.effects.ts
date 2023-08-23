import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


import * as AuthActions from '../store/actions';

@Injectable()
export class AuthEffects {
  registerAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerAction),
      switchMap(action => {
        // Wyłącz przycisk
        const disableAction = AuthActions.setRegisterButtonDisabled({ disabled: true });
        return of(disableAction).pipe(
          // Tutaj wykonaj rzeczywistą logikę rejestracji, np. HTTP żądanie
          // W razie sukcesu wyślij akcję registerSuccess i przywróć przycisk
          // W razie błędu wyślij akcję registerFailure i przywróć przycisk
        );
      })
    )
  );








  constructor(private actions$: Actions) {}
}
