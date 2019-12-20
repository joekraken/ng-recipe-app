import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

// defines the global App State object used throughout app
// easier to change State type and properties
export interface AppState {
  shoppingList: fromShoppingList.StateType;
  auth: fromAuth.StateType;
}

// global Reducer to centralize the other Reducers
export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
