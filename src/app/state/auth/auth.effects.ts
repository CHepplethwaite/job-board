import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(action =>
        this.authService.login(action.credentials).pipe(
          map(({ user, token }) => AuthActions.loginSuccess({ user, token })),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(action =>
        this.authService.register(action.userData).pipe(
          map(({ user, token }) => AuthActions.registerSuccess({ user, token })),
          catchError(error => of(AuthActions.registerFailure({ error: error.message })))
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
      }),
      map(() => AuthActions.logoutSuccess())
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      switchMap(() =>
        this.authService.currentUser$.pipe(
          map(user => {
            if (user) {
              return AuthActions.loadUserSuccess({ user });
            } else {
              return AuthActions.loadUserFailure();
            }
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}