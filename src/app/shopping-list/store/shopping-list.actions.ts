import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

// string identifiers for actions
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';


// AddIngredient class that implements the Action interface
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT; // 'type' property is required by Action interface
  // payload: Ingredient;
  // creates a new object with a given data payload
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

// UpdateIngredient class that implements the Action interface
export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  // create a new object with payload with index and new ingredient
  constructor(public payload: { index: number, ingredient: Ingredient }) {}
}

// DeleteIngredient class that implements the Action interface
export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
  // create a new object with payload of the ingredient index
  constructor(public payload: number) {}
}

// for editing an ingredient on the shopping list
export class StartEdit implements Action {
  readonly type = START_EDIT;
  // create a new object with payload of ingredient index to edit
  constructor(public payload: number) {}
}

// for reseting, in the state, the editing ingredient to null
export class StopEdit implements Action {
  readonly type = STOP_EDIT;
  // no payloaded needed
}

// union of all the types of custom Actions
export type ShoppingListActionType = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit;
