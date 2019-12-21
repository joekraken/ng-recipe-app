import { Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { User } from '../user.model';

// defines the properties of the Auth Store
export interface StateType {
  user: User;
}

// data used to set the state when app loads for 1st time
const initialState: StateType = {
  user: null
};

// Reducer function that takes a state and the action
// assign default value to state for 1st time, afterwards will change
export function authReducer(state = initialState, action: AuthActions.Types) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const data = action.payload;
      const user = new User(data.email, data.userId, data.token, data.expirationDate); // create user
      return {
        ...state,
        user: user // store logged in user
      };
    case AuthActions.LOGOUT:
      // clear the logged in user
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
