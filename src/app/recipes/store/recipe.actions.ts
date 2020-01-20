import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

// string identifiers for Recipe Action Types
export const SET_RECIPES = '[Recipes] SET_RECIPES';
export const FETCH_RECIPES = '[Recipes] FETCH_RECIPES';
export const ADD_RECIPE = '[Recipes] ADD_RECIPE';
export const UPDATE_RECIPE = '[Recipes] UPDATE_RECIPE';
export const DELETE_RECIPE = '[Recipes] DELETE_RECIPE';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  // standard practice is to use 'payload' as property
  constructor(public recipes: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
}

// union of the Recipe Action Types
export type Types = SetRecipes | FetchRecipes | AddRecipe | UpdateRecipe | DeleteRecipe;



