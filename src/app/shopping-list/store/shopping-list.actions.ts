import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

// export class that implements the Action interface
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT; // 'type' property is required by Action interface
  payload: Ingredient;
}
