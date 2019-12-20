// import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

// defines the properties and types of the Shopping List State objects
export interface StateType {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: StateType = {
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
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient, // copy the previous state (best practice)
        ...action.payload // Ingredient is the payload
      };
      // setup the updated Ingredients[] array and override the with new updated Ingredient data
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients, // update ingredient with new data
        // reset the editing ingredient
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        // use filter to keep all the ingredients except the one to delete
        ingredients: state.ingredients.filter((item, index) => {
          return index !== state.editedIngredientIndex; // true if indexes dont match
        }),
        // reset the editing ingredient
        editedIngredient: null,
        editedIngredientIndex: -1
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
