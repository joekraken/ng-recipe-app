import { Action } from '@ngrx/store';

//  string identifiers for auth actions
export const LOGIN_START = '[auth]LOGIN_START';
export const LOGIN = '[auth]LOGIN';
export const LOGIN_FAIL = '[auth]LOGIN_FAIL';
export const LOGOUT = '[auth]LOGOUT';


export class Login implements Action {
  readonly type = LOGIN;

  // pass the user data to reducer, which creates a new user
  // alternatively, create new User object then pass it as payload
  constructor(public payload: {email: string, userId: string, token, expirationDate: Date}) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  // no data required, the reducer will 'clear' the current user data
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  // pass as payload the user email and password for login
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  // pass an error message as payload
  constructor(public payload: string) {}
}

// union of the all the custom Auth Action types
export type Types = Login | Logout | LoginStart | LoginFail;
