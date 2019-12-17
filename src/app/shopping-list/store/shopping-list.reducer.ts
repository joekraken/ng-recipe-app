// import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 8)
  ]
};

// Reducer function that takes a state and the action
// assign default value to state for 1st time, afterwards will change
export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state, // copy the previous state (best practice)
        ingredients: [...state.ingredients, action.payload] // update the property with the new object from action
      };
  }
}
