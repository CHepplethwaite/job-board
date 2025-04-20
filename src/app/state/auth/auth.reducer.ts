import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../core/models/user.model';

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, AuthActions.register, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, AuthActions.registerSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(AuthActions.logoutSuccess, () => initialState),
  on(AuthActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),
  on(AuthActions.loadUserFailure, () => initialState)
);