// import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

// defines the global App State object used throughout app
// easier to change State type and properties
export interface AppState {
  shoppingList: StateType;
}

// defines the properties and types of the Shopping List State objects
export interface StateType {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState = {
  ingredients: [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 8)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

// Reducer function that takes a state and the action
// assign default value to state for 1st time, afterwards will change
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActionType) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state, // copy the previous state (best practice)
        ingredients: [...state.ingredients, action.payload] // update the property with the new data payload from action
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state, // copy the previous state (best practice)
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      // setup the updated ingredient
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient, // copy the previous state (best practice)
        ...action.payload.ingredient // then change what is needed
      };
      // setup the updated Ingredients[] array and override the with new updated Ingredient data
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((item, index) => {
          return index !== action.payload; // true if indexes dont match
        })
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,  // index of ingredient to edit
        editedIngredient: { ...state.ingredients[action.payload] } // use spread operator to create a new Ingredient object
      };
    case ShoppingListActions.STOP_EDIT:
      // reset the state for editing ingredient to null
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default: // default handles the initial action when app is loaded
      return state;
  }
}
