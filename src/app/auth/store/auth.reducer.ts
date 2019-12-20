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
export function authReducer(state = initialState, action) {
  return state;
}
