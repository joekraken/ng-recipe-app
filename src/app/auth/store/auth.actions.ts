import { Action } from '@ngrx/store';

//  string identifiers for auth actions
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


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

// union of the all the custom Auth Action types
export type Types = Login | Logout;
