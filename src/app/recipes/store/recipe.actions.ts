import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

// string identifiers for Recipe Action Types
export const SET_RECIPES = '[Recipes] SET_RECIPES';
export const FETCH_RECIPES = '[Recipes] FETCH_RECIPES';
export const ADD_RECIPE = '[Recipes] ADD_RECIPE';
export const UPDATE_RECIPE = '[Recipes] UPDATE_RECIPE';
export const DELETE_RECIPE = '[Recipes] DELETE_RECIPE';
export const STORE_RECIPES = '[Recipes] STORE_RECIPES';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  // payload is the recipe[] to set in the NgRx Store
  constructor(public recipes: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;

  // no payload required, return the recipe[] from the NgRx Store
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  // payload is the new recipe to include in the recipe[]
  constructor(public recipe: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  // payload is index of recipe to change and its new data
  constructor(public index: number, public recipe: Recipe) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  // payload is index of recipe to remove from recipe[]
  constructor(public index: number) {}
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

// union of the Recipe Action Types
export type Types = SetRecipes | FetchRecipes | AddRecipe | UpdateRecipe | DeleteRecipe | StoreRecipes;



