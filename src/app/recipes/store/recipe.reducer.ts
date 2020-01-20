import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

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
export function recipeReducer(state = initialState, action: RecipeActions.Types) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.recipes] // spread operator to set the recipes payload
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.recipe]
      };
    case RecipeActions.UPDATE_RECIPE:
      // set new data into an update recipe object
      const updatedRecipe = { ...state.recipes[action.index], ...action.recipe };
      // get all the recipes and update the recipe at the index
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          // return elements that dontr match the index to remove at
          return index !== action.index;
        })
      };
    default:
      return state;
  }
}
