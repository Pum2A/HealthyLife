import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from '../store/actions';

@Injectable()
export class AuthEffects {
  registerFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerFailure),
      map(action => {
        const error = action.error; // Pobierz przekazany błąd
        return AuthActions.registerFailure({ error }); // Wywołaj inną akcję do zaktualizowania stanu
      })
    )
  );

  constructor(private actions$: Actions) {}
}
