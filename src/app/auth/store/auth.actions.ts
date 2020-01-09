import { Action } from '@ngrx/store';

//  string identifiers for auth actions
export const LOGIN_START = '[auth]LOGIN_START';
// used for successful Login and Signup
export const AUTHENTICATE_SUCCESS = '[auth]AUTHENTICATE_SUCCESS';
// used for failed Login and Signup
export const AUTHENTICATE_FAIL = '[auth]AUTHENTICATE_FAIL';
export const SIGNUP_START = '[auth]SIGNUP_START';
export const LOGOUT = '[auth]LOGOUT';
// clearing and handling errors
export const CLEAR_ERROR = '[auth]CLEAR_ERROR';


// for successful login or signup
export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
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

// for failed login or signup
export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  // pass an error message as payload
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  // signup requires as payload the new user email and password
  constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}
// union of the all the custom Auth Action types
export type Types = AuthenticateSuccess | Logout | LoginStart | AuthenticateFail  | SignupStart | ClearError;
