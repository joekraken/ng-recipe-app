import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipes.actions';

// template describing the Recipe State
export interface State {
  recipes: Recipe[];
}

// initial Recipe State, an empy array of Recipe objects
const initialState: State = {
  recipes: []
};

// Reducer function, takes a state and action
// depending in Action Type, returns a new State or current one
export function recipeReducer(state = initialState, action: RecipesActions.Types) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.recipes] // spread operator to set the recipes payload
      };
    default:
      return state;
  }
}
